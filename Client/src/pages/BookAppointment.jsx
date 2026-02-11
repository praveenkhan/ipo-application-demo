import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";

import heroImg from "../assets/img/bg-img/breadcumb1.jpg"

const DOCTOR_API = `${API_BASE_URL}/api/doctors`;
const APPOINTMENT_API = `${API_BASE_URL}/api/appointments`;

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

  useEffect(() => {
    fetch(`${DOCTOR_API}?status=active`)
      .then((res) => res.json())
      .then(setDoctors)
      .catch(() => toast.error("Failed to load doctors"));
  }, []);

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

  useEffect(() => {
    const doctor = doctors.find((d) => d._id === form.doctorId);
    if (!doctor) return;

    const allSlots = generateSlots(
      doctor.startTime,
      doctor.endTime,
      doctor.slotDuration || 30,
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

    if (!res.ok) {
      toast.error("Booking failed");
      return;
    }

    navigate("/my-appointments");
  };

  return (
    <div
      className="min-h-screen pt-[120px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center py-24">
        {/* LEFT PREMIUM CARD */}
        <form
          onSubmit={submit}
          className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl p-8 space-y-5 max-w-md border border-white/40"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Book Appointment
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Quick medical booking in seconds
          </p>

          <input
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select>

          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Time</option>
            {availableSlots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition text-white py-3 rounded-lg shadow-lg hover:shadow-xl">
            Check Availability
          </button>
        </form>

        {/* RIGHT PREMIUM CONTENT */}
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Smart Hospital
            <br />
            Appointment Booking
          </h1>

          <p className="max-w-md text-lg opacity-90 mb-6">
            Choose your doctor, pick a time, and confirm your visit instantly
            with our modern healthcare platform.
          </p>

          <div className="flex gap-6 text-sm opacity-90">
            <span>✔ Trusted Doctors</span>
            <span>✔ Instant Booking</span>
            <span>✔ Secure</span>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl space-y-6 text-center shadow-xl">
            <h3 className="text-xl font-semibold">Confirm Booking?</h3>

            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
              >
                Confirm
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="border px-8 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
