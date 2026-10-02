import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import {
  FaCalendarCheck,
  FaClock,
  FaCircleCheck,
  FaBan,
  FaUserDoctor,
  FaArrowRight,
  FaHospitalUser,
  FaChartLine,
} from "react-icons/fa6";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/admin/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        const list = res.data || [];

        setStats({
          total: list.length,
          pending: list.filter((a) => a.status === "pending").length,
          confirmed: list.filter((a) => a.status === "confirmed").length,
          cancelled: list.filter((a) => a.status === "cancelled").length,
          completed: list.filter((a) => a.status === "completed").length,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading || !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-md w-48" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-32 bg-slate-200 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Executive Overview
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Real-time appointment metrics, patient check-ins, and schedule statuses
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        <StatCard
          label="Total Bookings"
          value={stats.total}
          icon={<FaCalendarCheck className="text-blue-600 text-xl" />}
          iconBg="bg-blue-50 border-blue-100"
          badge="All time"
        />
        <StatCard
          label="Pending Review"
          value={stats.pending}
          icon={<FaClock className="text-amber-600 text-xl" />}
          iconBg="bg-amber-50 border-amber-100"
          badge="Needs Action"
          badgeColor="text-amber-700 bg-amber-50"
        />
        <StatCard
          label="Confirmed"
          value={stats.confirmed}
          icon={<FaCircleCheck className="text-emerald-600 text-xl" />}
          iconBg="bg-emerald-50 border-emerald-100"
          badge="Scheduled"
          badgeColor="text-emerald-700 bg-emerald-50"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon={<FaHospitalUser className="text-sky-600 text-xl" />}
          iconBg="bg-sky-50 border-sky-100"
          badge="Finished"
          badgeColor="text-sky-700 bg-sky-50"
        />
        <StatCard
          label="Cancelled"
          value={stats.cancelled}
          icon={<FaBan className="text-rose-600 text-xl" />}
          iconBg="bg-rose-50 border-rose-100"
          badge="Revoked"
          badgeColor="text-rose-700 bg-rose-50"
        />
      </div>

      {/* QUICK ACTIONS & SHORTCUTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 text-lg">
              <FaCalendarCheck />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Manage Appointments
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
              Review new patient bookings, approve pending requests, reschedule timings, or update consultation statuses.
            </p>
          </div>
          <Link
            to="/admin/appointments"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>Open Appointments Queue</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 text-lg">
              <FaUserDoctor />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Doctor Directory & Staff
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
              Browse hospital practitioners, view medical specializations, manage active faculty, and adjust availability.
            </p>
          </div>
          <Link
            to="/admin/doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            <span>View Doctor Roster</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, iconBg, badge, badgeColor = "text-blue-600 bg-blue-50" }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
        {value}
      </h3>
    </div>
  );
}