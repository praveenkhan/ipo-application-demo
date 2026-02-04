import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "./AdminDashboard.css";
import { toast } from "react-hot-toast";

const APPT_API = `${API_BASE_URL}/api/admin/appointments`;
const DOCTOR_API = `${API_BASE_URL}/api/admin/doctors`;

export default function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    doctor: "",
    date: "",
    search: "",
  });

  /* ---------------- LOAD DOCTORS ---------------- */

  const fetchDoctors = async () => {
    try {
      const res = await fetch(DOCTOR_API, {
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) throw new Error("Failed to load doctors");

      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      toast.error(err.message || "Failed to load doctors");
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* ---------------- LOAD APPOINTMENTS ---------------- */

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams(filters);

      const res = await fetch(`${APPT_API}?${params}`, {
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) throw new Error("Failed");

      setAppointments(await res.json());
    } catch {
      setError("Cannot load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  /* ---------------- STATUS UPDATE ---------------- */

  const updateStatus = async (id, status) => {
    await fetch(`${APPT_API}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchAppointments();
  };

  /* ---------------- RESCHEDULE ---------------- */

  const reschedule = async () => {
    await fetch(`${APPT_API}/${editing._id}/reschedule`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: newDate, time: newTime }),
    });

    setEditing(null);
    fetchAppointments();
  };

  /* ---------------- DOCTOR CONTROL ---------------- */

  const toggleDoctor = async (d) => {
    const newStatus =
      (d.status || "").toString().toLowerCase() === "active"
        ? "inactive"
        : "active";

    try {
      const res = await fetch(`${DOCTOR_API}/${d._id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update doctor status");

      toast.success("Doctor status updated");
      fetchDoctors();
    } catch (err) {
      toast.error(err.message || "Failed to update doctor");
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const res = await fetch(`${DOCTOR_API}/${id}/delete`, {
        method: "PATCH",
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) throw new Error("Failed to delete doctor");

      toast.success("Doctor deleted");
      fetchDoctors();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FILTERS */}

      <div className="filters">
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
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

      {/* DOCTORS */}

      <h3>Doctors</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Spec</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

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
                  {(d.status || "").toString().toLowerCase() === "active"
                    ? "Disable"
                    : "Enable"}
                  {(d.status || "").toString().toLowerCase() === "inactive"
                    ? "Disable"
                    : "Enable"}
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
          <h3>Reschedule</h3>

          <input type="date" onChange={(e) => setNewDate(e.target.value)} />
          <input type="time" onChange={(e) => setNewTime(e.target.value)} />

          <button onClick={reschedule}>Save</button>
          <button onClick={() => setEditing(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
