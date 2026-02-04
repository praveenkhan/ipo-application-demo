import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/api/admin/appointments`;
const DOCTOR_API = `${API_BASE_URL}/api/doctors`;

export default function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    doctor: "",
    search: "",
    status: "",
  });

  /* ---------------- FETCH DOCTORS ---------------- */
  const fetchDoctors = async () => {
    const res = await fetch(DOCTOR_API, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* ---------------- FETCH APPOINTMENTS ---------------- */
  // const fetchAppointments = async () => {
  //   const params = new URLSearchParams();
  //   if (filters.date) params.set("date", filters.date);
  //   if (filters.doctor) params.set("doctor", filters.doctor);
  //   if (filters.search) params.set("search", filters.search);
  //   if (filters.status) params.set("status", filters.status);

  //   const res = await fetch(`${API}?${params.toString()}`, {
  //     headers: { Authorization: "Bearer " + token },
  //   });

  //   const data = await res.json();
  //   setAppointments(data);
  // };

  // useEffect(() => {
  //   fetchAppointments();
  // }, [filters]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (filters.date) params.set("date", filters.date);
      if (filters.doctor) params.set("doctor", filters.doctor);
      if (filters.search) params.set("search", filters.search);
      if (filters.status) params.set("status", filters.status);

      const res = await fetch(`${API}?${params.toString()}`, {
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) throw new Error("Failed to load appointments");

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  /* ---------------- UPDATE APPOINTMENT STATUS ---------------- */
  const updateStatus = async (id, status) => {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ status }),
    });

    fetchAppointments();
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  /* ---------------- UPDATE DOCTOR STATUS ---------------- */
  const updateDoctorStatus = async (id, status) => {
    await fetch(`${DOCTOR_API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ status }),
    });

    fetchDoctors();
  };

  return (
    <div className="admin-container">
      <h3>Appointments</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />

        <select
          value={filters.doctor}
          onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
        >
          <option value="">All Doctors</option>
          {doctors.map((d) => (
            <option key={d._id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Search patient"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {/* APPOINTMENTS TABLE */}
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
                {a.status === "pending" ? (
                  <>
                    <button onClick={() => updateStatus(a._id, "confirmed")}>
                      Confirm
                    </button>
                    <button onClick={() => updateStatus(a._id, "cancelled")}>
                      Cancel
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DOCTORS TABLE */}
      <h3>Doctors</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
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
                {d.startTime} – {d.endTime}
              </td>
              <td>{d.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateDoctorStatus(
                      d._id,
                      d.status === "active" ? "inactive" : "active",
                    )
                  }
                >
                  {d.status === "active" ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => {
                    doctors.filter((d) => !d.isDeleted);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="stats">
        <div>Total: {stats.total}</div>
        <div>Pending: {stats.pending}</div>
        <div>Confirmed: {stats.confirmed}</div>
        <div>Cancelled: {stats.cancelled}</div>
      </div>
    </div>
  );
}
