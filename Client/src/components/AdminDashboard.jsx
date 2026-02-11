import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";
import AdminLayout from "./AdminLayout";

const APPT_API = `${API_BASE_URL}/api/admin/appointments`;
const DOCTOR_API = `${API_BASE_URL}/api/admin/doctors`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    doctor: "",
    date: "",
    search: "",
  });

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch(DOCTOR_API, { headers });
      if (res.status === 401) return navigate("/login");
      setDoctors(await res.json());
    } catch {
      toast.error("Failed loading doctors");
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const res = await fetch(`${APPT_API}?${params}`, { headers });
      if (res.status === 401) return navigate("/login");
      setAppointments(await res.json());
    } catch {
      toast.error("Failed loading appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchAppointments, 400);
    return () => clearTimeout(timer);
  }, [filters]);

  const updateStatus = async (id, status) => {
    await fetch(`${APPT_API}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    fetchAppointments();
  };

  const reschedule = async () => {
    await fetch(`${APPT_API}/${editing._id}/reschedule`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ date: newDate, time: newTime }),
    });
    setEditing(null);
    fetchAppointments();
  };

  const toggleDoctor = async (doc) => {
    const status = doc.status === "active" ? "inactive" : "active";

    await fetch(`${DOCTOR_API}/${doc._id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await fetch(`${DOCTOR_API}/${id}/delete`, {
      method: "PATCH",
      headers,
    });

    fetchDoctors();
  };

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
  }, [appointments]);

  if (loading)
    return <p className="text-center pt-20 text-gray-500">Loading…</p>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <Stat label="Total" value={stats.total} />
            <Stat label="Pending" value={stats.pending} />
            <Stat label="Confirmed" value={stats.confirmed} />
            <Stat label="Cancelled" value={stats.cancelled} />
          </div>

          {/* FILTERS */}
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl p-4 grid md:grid-cols-4 gap-4 mb-10">
            <select
              className="border rounded px-3 py-2"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <input
              type="date"
              className="border rounded px-3 py-2"
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />

            <select
              className="border rounded px-3 py-2"
              onChange={(e) =>
                setFilters({ ...filters, doctor: e.target.value })
              }
            >
              <option value="">Doctors</option>
              {doctors.map((d) => (
                <option key={d._id}>{d.name}</option>
              ))}
            </select>

            <input
              placeholder="Search patient"
              className="border rounded px-3 py-2"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          {/* APPOINTMENTS */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="bg-white/70 backdrop-blur rounded-2xl shadow-xl hover:-translate-y-1 transition p-6"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {a.userId?.name?.charAt(0)}
                    </div>

                    <h4 className="font-semibold">{a.userId?.name}</h4>
                  </div>

                  <StatusBadge status={a.status} />
                </div>

                <p className="text-sm text-gray-500 mb-1">{a.userId?.email}</p>

                <p className="text-sm">Doctor: {a.doctorName}</p>

                <p className="text-sm mb-3">
                  Date: {new Date(a.date).toLocaleDateString()}
                </p>

                {a.status === "pending" && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => updateStatus(a._id, "confirmed")}
                      className="bg-green-500 text-white px-4 py-1 rounded-full text-sm"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(a._id, "cancelled")}
                      className="bg-red-500 text-white px-4 py-1 rounded-full text-sm"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => setEditing(a)}
                      className="border px-4 py-1 rounded-full text-sm"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DOCTORS */}
          <h3 className="text-2xl font-semibold mb-4">Doctors</h3>

          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
            {doctors.map((d) => (
              <div
                key={d._id}
                className="flex justify-between items-center border-b px-6 py-4 hover:bg-blue-50/50 transition"
              >
                <div>
                  <p className="font-medium">{d.name}</p>
                  <p className="text-sm text-gray-500">
                    {d.specialization} • {d.startTime} - {d.endTime}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleDoctor(d)}
                    className="border px-4 py-1 rounded-full text-sm"
                  >
                    {d.status === "active" ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => deleteDoctor(d._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL */}
          {editing && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl space-y-4">
                <input
                  type="date"
                  className="border px-3 py-2 rounded w-full"
                  onChange={(e) => setNewDate(e.target.value)}
                />

                <input
                  type="time"
                  className="border px-3 py-2 rounded w-full"
                  onChange={(e) => setNewTime(e.target.value)}
                />

                <div className="flex gap-3">
                  <button
                    onClick={reschedule}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditing(null)}
                    className="border px-6 py-2 rounded-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur shadow-xl p-6 hover:-translate-y-1 transition">
      <p className="text-sm text-gray-500 mb-2">{label}</p>

      <h3 className="text-3xl font-bold text-blue-600">{value}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
  let color = "bg-gray-400";
  if (status === "pending") color = "bg-yellow-400";
  if (status === "confirmed") color = "bg-green-500";
  if (status === "cancelled") color = "bg-red-500";

  return (
    <span className={`${color} text-white text-xs px-3 py-1 rounded-full`}>
      {status}
    </span>
  );
}
