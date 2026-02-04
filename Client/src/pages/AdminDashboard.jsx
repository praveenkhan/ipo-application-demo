import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "./AdminDashboard.css";

const APPT_API = `${API_BASE_URL}/api/admin/appointments`;
const DOCTOR_API = `${API_BASE_URL}/api/admin/doctors`;

export default function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  /* LOAD DATA */

  const fetchAppointments = async () => {
    const res = await fetch(APPT_API, {
      headers: { Authorization: "Bearer " + token },
    });
    setAppointments(await res.json());
  };

  const fetchDoctors = async () => {
    const res = await fetch(DOCTOR_API, {
      headers: { Authorization: "Bearer " + token },
    });
    setDoctors(await res.json());
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  /* APPOINTMENT STATUS */

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

  /* RESCHEDULE */

  const saveReschedule = async () => {
    await fetch(`${APPT_API}/${editing._id}/reschedule`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, time }),
    });

    setEditing(null);
    fetchAppointments();
  };

  /* DOCTOR STATUS */

  const toggleDoctor = async (d) => {
    const status = d.status === "active" ? "inactive" : "active";

    await fetch(`${DOCTOR_API}/${d._id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchDoctors();
  };

  /* DELETE DOCTOR */

  const deleteDoctor = async (id) => {
    await fetch(`${DOCTOR_API}/${id}/delete`, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    });

    fetchDoctors();
  };

  return (
    <div className="admin-container">
      <h2>Appointments</h2>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.patientName}</td>
              <td>{a.doctorName}</td>
              <td>{a.date}</td>
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

      <h2>Doctors</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Spec</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
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

      {editing && (
        <div className="modal">
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <input type="time" onChange={(e) => setTime(e.target.value)} />

          <button onClick={saveReschedule}>Save</button>
          <button onClick={() => setEditing(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
