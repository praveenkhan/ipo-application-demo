import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";
import {
  FaCalendarCheck,
  FaClock,
  FaCalendarDays,
  FaUser,
  FaUserDoctor,
  FaMagnifyingGlass,
  FaCircleCheck,
  FaXmark,
  FaPenToSquare,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa6";

const APPT_API = `${API_BASE_URL}/api/admin/appointments`;

export default function Appointments() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...filters, page, limit: 6 });
      const res = await fetch(`${APPT_API}?${params}`, { headers });
      const data = await res.json();

      setAppointments(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchAppointments();
  }, [page, filters]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${APPT_API}/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success(`Status updated to ${status}`);
      fetchAppointments();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const reschedule = async () => {
    if (!newDate || !newTime) {
      toast.error("Please pick both new date and time");
      return;
    }

    try {
      const res = await fetch(`${APPT_API}/${editing._id}/reschedule`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ date: newDate, time: newTime }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Reschedule failed");
        return;
      }

      toast.success("Appointment rescheduled successfully");
      setEditing(null);
      fetchAppointments();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Appointment Management
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Approve, reschedule, or cancel patient booking requests
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm grid sm:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Filter by Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer"
          />
        </div>

        {/* Patient Search */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Search Patient
          </label>
          <div className="relative flex items-center">
            <FaMagnifyingGlass className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
            <input
              placeholder="Search by patient name..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* APPOINTMENTS LIST */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse space-y-4"
            >
              <div className="h-6 bg-slate-100 rounded w-1/2" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
          <FaCalendarCheck className="text-3xl text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">
            No Appointments Found
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Try adjusting your search criteria or date filter.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((a) => (
            <div
              key={a._id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                {/* TOP: DATE & STATUS */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <FaCalendarDays className="text-slate-400 text-[11px]" />
                    {new Date(a.date).toLocaleDateString()}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                      a.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : a.status === "pending"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : a.status === "cancelled"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                {/* PATIENT & DOCTOR */}
                <h4 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                  <FaUser className="text-xs text-blue-500" />
                  <span>{a.userId?.name || a.patientName || "Patient"}</span>
                </h4>

                <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                  <FaUserDoctor className="text-slate-400" />
                  <span>{a.doctorName}</span>
                </p>

                <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-6">
                  <FaClock className="text-slate-400" />
                  <span>Slot: <strong>{a.time || "Regular Slot"}</strong></span>
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                {a.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(a._id, "confirmed")}
                      className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
                    >
                      <FaCircleCheck className="text-[10px]" />
                      <span>Confirm</span>
                    </button>

                    <button
                      onClick={() => updateStatus(a._id, "cancelled")}
                      className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
                    >
                      <FaXmark className="text-[10px]" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}

                {a.status === "confirmed" && (
                  <button
                    onClick={() => updateStatus(a._id, "completed")}
                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <FaCircleCheck className="text-[10px]" />
                    <span>Mark Completed</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setEditing(a);
                    setNewDate(a.date ? a.date.split("T")[0] : "");
                    setNewTime(a.time || "");
                  }}
                  className="inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer ml-auto"
                >
                  <FaPenToSquare className="text-[10px]" />
                  <span>Reschedule</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
          >
            <FaChevronLeft className="text-[10px]" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-semibold text-slate-600 px-3">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
          >
            <span>Next</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex justify-center items-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Reschedule Appointment
                </h3>
                <p className="text-xs text-slate-500">
                  Select new date and time for {editing.patientName || "Patient"}
                </p>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <FaXmark className="text-sm" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                New Date
              </label>
              <input
                type="date"
                value={newDate}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500"
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                New Time Slot
              </label>
              <input
                type="time"
                value={newTime}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500"
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={reschedule}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md shadow-blue-500/20 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}