import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { getDoctorImage } from "../data/doctorImages";
import {
  FaCalendarCheck,
  FaClock,
  FaUserDoctor,
  FaUser,
  FaCalendarDays,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaHospital,
} from "react-icons/fa6";

const API = `${API_BASE_URL}/api/appointments/my`;

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch(`${API}?page=${page}&limit=9`, {
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
    <div className="bg-slate-50 min-h-screen pt-[130px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER & ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-100">
              <FaCalendarCheck className="text-xs" />
              <span>Patient Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Appointments
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Review and manage your scheduled doctor consultations and visits
            </p>
          </div>

          <div>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition text-sm"
            >
              <span>Book New Appointment</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-100 rounded w-24" />
                  <div className="h-6 bg-slate-100 rounded-full w-20" />
                </div>
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="h-10 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && appointments.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto my-10 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FaCalendarDays className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No Appointments Scheduled
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              You do not have any active or past appointments yet. Book a consultation with our verified doctors in just a few clicks.
            </p>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition text-sm"
            >
              <FaUserDoctor className="text-sm" />
              <span>Browse Doctors</span>
            </Link>
          </div>
        )}

        {/* APPOINTMENT CARDS GRID */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* TOP: DATE BADGE & STATUS */}
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      <FaCalendarDays className="text-slate-400 text-[11px]" />
                      {new Date(a.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <StatusBadge status={a.status} />
                  </div>

                  {/* DOCTOR INFO */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={getDoctorImage({ name: a.doctorName })}
                      alt={a.doctorName || "Doctor"}
                      className="w-12 h-12 rounded-2xl object-cover object-top border border-slate-200 flex-shrink-0 shadow-xs"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                        {a.doctorName || "Doctor Consultation"}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <FaUser className="text-[10px] text-slate-400" />
                        <span>Patient: <strong className="text-slate-700">{a.patientName}</strong></span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTTOM: TIME & LOCATION INFO */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 bg-blue-50/70 text-blue-700 px-3 py-1.5 rounded-xl">
                    <FaClock className="text-blue-500 text-[11px]" />
                    {a.time}
                  </span>

                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <FaHospital className="text-[11px]" />
                    Main Clinic
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
            >
              <FaChevronLeft className="text-xs" />
              <span>Previous</span>
            </button>

            <span className="text-sm font-medium text-slate-600 px-3">
              Page <strong className="text-slate-900 font-bold">{page}</strong> of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
            >
              <span>Next</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";
  let dotStyle = "bg-slate-400";

  if (status === "confirmed") {
    badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dotStyle = "bg-emerald-500";
  } else if (status === "pending") {
    badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
    dotStyle = "bg-amber-500 animate-pulse";
  } else if (status === "cancelled") {
    badgeStyle = "bg-rose-50 text-rose-700 border-rose-200";
    dotStyle = "bg-rose-500";
  } else if (status === "completed") {
    badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
    dotStyle = "bg-blue-500";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border capitalize ${badgeStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>
      {status}
    </span>
  );
}

