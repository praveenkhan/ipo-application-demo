import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";

const APPT_API = `${API_BASE_URL}/api/admin/appointments`;

export default function Appointments() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    date: "",
    search: "",
  });

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchAppointments = async () => {
    const params = new URLSearchParams({ ...filters, page, limit: 6 });

    const res = await fetch(`${APPT_API}?${params}`, { headers });
    const data = await res.json();

    setAppointments(data.data || []);
    setTotalPages(data.totalPages || 1);
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchAppointments();
  }, [page, filters]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`${APPT_API}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Updated");
    fetchAppointments();
  };

  const reschedule = async () => {
    const res = await fetch(`${APPT_API}/${editing._id}/reschedule`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ date: newDate, time: newTime }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Rescheduled");
    setEditing(null);
    fetchAppointments();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Appointments</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <select className="border p-2" onChange={e => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input type="date" className="border p-2" onChange={e => setFilters({ ...filters, date: e.target.value })} />

        <input placeholder="Search patient" className="border p-2"
          onChange={e => setFilters({ ...filters, search: e.target.value })} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {appointments.map(a => (
          <div key={a._id} className="bg-white p-6 rounded-xl shadow">
            <h4>{a.userId?.name}</h4>
            <p>{a.doctorName}</p>
            <p>{new Date(a.date).toLocaleDateString()}</p>

            <div className="flex gap-2 mt-3">

              {a.status === "pending" && (
                <>
                  <button onClick={() => updateStatus(a._id, "confirmed")} className="bg-green-500 text-white px-3 py-1 rounded">
                    Confirm
                  </button>

                  <button onClick={() => updateStatus(a._id, "cancelled")} className="bg-red-500 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </>
              )}

              <button onClick={() => setEditing(a)} className="border px-3 py-1 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl space-y-4">
            <input type="date" className="border p-2 w-full" onChange={e => setNewDate(e.target.value)} />
            <input type="time" className="border p-2 w-full" onChange={e => setNewTime(e.target.value)} />

            <button onClick={reschedule} className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}