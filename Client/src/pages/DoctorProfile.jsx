import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DoctorProfile.css";

const DOCTOR_API = "http://localhost:5000/api/doctors";
const APPOINTMENT_API = "http://localhost:5000/api/appointments/";

// Generate slots between start & end time
function generateSlots(start, end, duration) {
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

function DoctorProfile() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch doctor by ID
    fetch(`${DOCTOR_API}/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch(console.error);
      console.log("Doctor ID from URL:", id);
      console.log("Fetching:", `${DOCTOR_API}/${id}`);

    // Fetch all appointments
    fetch(APPOINTMENT_API)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch(console.error);
  }, [id]);

  if (!doctor) return <h2>Loading doctor profile...</h2>;

  // Generate slots
  const allSlots = generateSlots(
    doctor.startTime,
    doctor.endTime,
    doctor.slotDuration
  );

  const today = new Date().toISOString().split("T")[0];

  // Get booked slots for this doctor today
  const bookedSlots = appointments
    .filter((a) => a.doctorId === doctor._id && a.date === today)
    .map((a) => a.time);

  // Available slots
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{doctor.name}</h2>
        <p className="spec">{doctor.specialization}</p>

        {doctor.experience && (
          <p>
            <strong>Experience:</strong> {doctor.experience} yrs
          </p>
        )}

        {doctor.rating && (
          <p>
            <strong>Rating:</strong> ⭐ {doctor.rating}
          </p>
        )}

        <p>{doctor.description}</p>

        <h3>Available Slots Today</h3>

        {availableSlots.length ? (
          <div className="slot-grid">
            {availableSlots.map((slot) => (
              <span key={slot} className="slot">
                {slot}
              </span>
            ))}
          </div>
        ) : (
          <p>No slots available today</p>
        )}

        <Link to={`/book?doctorId=${doctor._id}`} className="btn-book">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorProfile;
