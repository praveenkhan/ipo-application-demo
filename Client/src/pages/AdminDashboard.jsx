import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";
import "./AdminDashboard.css";

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

  /* ---------- AUTH GUARD ---------- */

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  /* ---------- LOAD DOCTORS ---------- */

  const fetchDoctors = async () => {
    try {
      const res = await fetch(DOCTOR_API, { headers });

      if (res.status === 401) return navigate("/login");

      setDoctors(await res.json());
    } catch {
      toast.error("Failed loading doctors");
    }
  };

  /* ---------- LOAD APPOINTMENTS ---------- */

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

  /* ---------- STATUS UPDATE ---------- */

  const updateStatus = async (id, status) => {
    await fetch(`${APPT_API}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    fetchAppointments();
  };

  /* ---------- RESCHEDULE ---------- */

  const reschedule = async () => {
    await fetch(`${APPT_API}/${editing._id}/reschedule`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ date: newDate, time: newTime }),
    });

    setEditing(null);
    fetchAppointments();
  };

  /* ---------- DOCTOR CONTROL ---------- */

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

  /* ---------- STATS ---------- */

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
  }, [appointments]);

  /* ---------- UI ---------- */

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading…</h2>;

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* FILTERS */}

      <div className="filters">
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />

        <select
          onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
        >
          <option value="">Doctors</option>
          {doctors.map((d) => (
            <option key={d._id}>{d.name}</option>
          ))}
        </select>

        <input
          placeholder="Search patient"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {/* APPOINTMENTS */}

      {appointments.length === 0 ? (
        <p>No appointments</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Email</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.userId?.name}</td>
                <td>{a.userId?.email}</td>
                <td>{a.doctorName}</td>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.status}</td>

                <td>
                  {a.status === "pending" && (
                    <>
                      <button onClick={() => updateStatus(a._id, "confirmed")}>
                        Confirm
                      </button>
                      <button onClick={() => updateStatus(a._id, "cancelled")}>
                        Cancel
                      </button>
                      <button onClick={() => setEditing(a)}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* DOCTORS */}

      <h3>Doctors</h3>

      <table>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
              <td>
                {d.startTime} - {d.endTime}
              </td>
              <td>{d.status}</td>
              <td>
                <button onClick={() => toggleDoctor(d)}>
                  {d.status === "active" ? "Disable" : "Enable"}
                </button>
                <button onClick={() => deleteDoctor(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* STATS */}

      <div className="stats">
        <div>Total: {stats.total}</div>
        <div>Pending: {stats.pending}</div>
        <div>Confirmed: {stats.confirmed}</div>
        <div>Cancelled: {stats.cancelled}</div>
      </div>

      {/* MODAL */}

      {editing && (
        <div className="modal">
          <input type="date" onChange={(e) => setNewDate(e.target.value)} />
          <input type="time" onChange={(e) => setNewTime(e.target.value)} />
          <button onClick={reschedule}>Save</button>
          <button onClick={() => setEditing(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
