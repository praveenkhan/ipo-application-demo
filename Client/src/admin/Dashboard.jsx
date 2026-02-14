import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setStats({
          total: data.length,
          pending: data.filter(a => a.status === "pending").length,
          confirmed: data.filter(a => a.status === "confirmed").length,
          cancelled: data.filter(a => a.status === "cancelled").length,
          completed: data.filter(a => a.status === "completed").length,
        });
      });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-5 gap-6">
        <Stat label="Total" value={stats.total} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Confirmed" value={stats.confirmed} />
        <Stat label="Cancelled" value={stats.cancelled} />
        <Stat label="Completed" value={stats.completed} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <p className="text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-blue-600">{value}</h3>
    </div>
  );
}