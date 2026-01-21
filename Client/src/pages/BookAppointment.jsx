import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

const DOCTOR_API = "http://localhost:5000/api/doctors";
const APPOINTMENT_API = "http://localhost:5000/api/appointments";

function generateSlots(start, end, duration = 30) {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  while (h < eh || (h === eh && m < em)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += duration;
    if (m >= 60) {
      h++;
      m -= 60;
    }
  }
  return slots;
}

export default function BookAppointment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [doctors, setDoctors] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    doctorId: "",
    date: "",
    time: "",
  });

  /* ---------------- LOAD ACTIVE DOCTORS ---------------- */

  useEffect(() => {
    fetch(`${DOCTOR_API}?status=active`)
      .then((res) => res.json())
      .then(setDoctors)
      .catch(() => alert("Failed to load doctors"));
  }, []);

  /* ---------------- LOAD BOOKED SLOTS ---------------- */

  useEffect(() => {
    if (!form.doctorId || !form.date) {
      setBookedSlots([]);
      return;
    }

    fetch(`${APPOINTMENT_API}/slots/${form.doctorId}/${form.date}`)
      .then((res) => res.json())
      .then((data) => setBookedSlots(data.map((s) => s.time)))
      .catch(() => setBookedSlots([]));
  }, [form.doctorId, form.date]);

  /* ---------------- GENERATE AVAILABLE SLOTS ---------------- */

  useEffect(() => {
    const doctor = doctors.find((d) => d._id === form.doctorId);
    if (!doctor) return;

    const allSlots = generateSlots(
      doctor.startTime,
      doctor.endTime,
      doctor.slotDuration || 30
    );

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    const filtered = allSlots.filter((slot) => {
      if (bookedSlots.includes(slot)) return false;

      if (form.date === today) {
        const [h, m] = slot.split(":").map(Number);
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);
        if (slotTime <= now) return false;
      }
      return true;
    });

    setAvailableSlots(filtered);
  }, [bookedSlots, doctors, form.doctorId, form.date]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmBooking = async () => {
    const doctor = doctors.find((d) => d._id === form.doctorId);

    const payload = {
      patientName: form.patientName,
      doctorId: doctor._id,
      doctorName: doctor.name,
      date: form.date,
      time: form.time,
    };

    const res = await fetch(APPOINTMENT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return alert("Booking failed");

    navigate("/my-appointments");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="booking-container">
      <h2>Book Appointment</h2>

      <form onSubmit={submit}>
        <input
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} ({d.specialization})
            </option>
          ))}
        </select>

        <select name="time" value={form.time} onChange={handleChange} required>
          <option value="">Select Time</option>
          {availableSlots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button>Submit</button>
      </form>

      {showModal && (
        <div className="modal">
          <button onClick={confirmBooking}>Confirm</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
