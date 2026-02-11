import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/api/appointments/my`;

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(API, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(setAppointments);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[140px] pb-20">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">My Appointments</h2>
        <p className="text-gray-500">
          Track and manage your booked doctor appointments
        </p>
      </div>

      {/* EMPTY STATE */}
      {appointments.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          No appointments found.
        </div>
      )}

      {/* APPOINTMENT CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {appointments.map((a) => (
          <div
            key={a._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">{a.date}</span>

              <StatusBadge status={a.status} />
            </div>

            {/* BODY */}
            <h3 className="font-semibold text-lg mb-2">{a.doctorName}</h3>

            <p className="text-gray-500 mb-3">Patient: {a.patientName}</p>

            <div className="flex justify-between text-sm text-gray-600">
              <span>🕒 {a.time}</span>
              <span>📅 {a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let color = "bg-gray-400";

  if (status === "confirmed") color = "bg-green-500";
  if (status === "pending") color = "bg-yellow-400";
  if (status === "cancelled") color = "bg-red-500";

  return (
    <span
      className={`${color} text-white text-xs px-3 py-1 rounded-full capitalize`}
    >
      {status}
    </span>
  );
}
