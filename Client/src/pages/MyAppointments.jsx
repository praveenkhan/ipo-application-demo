import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/api/appointments/my`;

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch(`${API}?page=${page}&limit=10`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.data || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, [page, token]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[140px] pb-20">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">My Appointments</h2>
        <p className="text-gray-500">
          Track and manage your booked doctor appointments
        </p>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your appointments...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && appointments.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          No appointments found.
        </div>
      )}

      {/* APPOINTMENT CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-6 py-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="self-center text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  let color = "bg-gray-400";

  if (status === "confirmed") color = "bg-green-500";
  if (status === "pending") color = "bg-yellow-400";
  if (status === "cancelled") color = "bg-red-500";
  if (status === "completed") color = "bg-blue-600"; // Added completed

  return (
    <span
      className={`${color} text-white text-xs px-3 py-1 rounded-full capitalize`}
    >
      {status}
    </span>
  );
}
