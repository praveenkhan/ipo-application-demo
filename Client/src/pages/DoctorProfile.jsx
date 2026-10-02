import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { getDoctorImage } from "../data/doctorImages";
import {
  FaUserDoctor,
  FaCalendarCheck,
  FaStar,
  FaAward,
  FaCircleCheck,
  FaArrowLeft,
  FaShieldHeart,
  FaClock,
  FaStethoscope,
  FaHospital,
} from "react-icons/fa6";

const DOCTOR_API = `${API_BASE_URL}/api/doctors`;

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${DOCTOR_API}/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading || !doctor) {
    return (
      <div className="min-h-screen bg-slate-50 pt-[150px] pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium text-sm">
            Loading doctor profile...
          </p>
        </div>
      </div>
    );
  }

  const doctorPhoto = getDoctorImage(doctor);

  return (
    <div className="bg-slate-50 min-h-screen pt-[130px] pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* BREADCRUMB & BACK LINK */}
        <div className="mb-6">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Doctors</span>
          </Link>
        </div>

        {/* HERO PROFILE CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden mb-10">
          {/* Header Banner */}
          <div className="h-44 sm:h-52 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 relative p-6 flex items-end">
            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-2 text-blue-200 text-xs font-semibold bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <FaHospital className="text-xs" />
              <span>Hospital+ Certified Specialist</span>
            </div>
          </div>

          {/* Profile Header Information */}
          <div className="px-6 sm:px-12 pb-10 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-8 gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white p-1.5 shadow-2xl border-2 border-white">
                  <img
                    src={doctorPhoto}
                    alt={doctor.name}
                    className="w-full h-full rounded-[22px] object-cover object-top shadow-sm"
                  />
                </div>
                <span
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-emerald-500 border-3 border-white flex items-center justify-center text-white text-xs shadow-md"
                  title="Verified Practitioner"
                >
                  <FaCircleCheck />
                </span>
              </div>

              {/* Quick Book CTA Button */}
              <div className="sm:pb-2">
                <Link
                  to={`/book?doctorId=${doctor._id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5"
                >
                  <FaCalendarCheck className="text-base" />
                  <span>Book Appointment Now</span>
                </Link>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="border-b border-slate-100 pb-8 mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {doctor.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Available for Consult
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                  <FaStethoscope className="text-xs" />
                  {doctor.specialization}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 flex items-center gap-1.5">
                  <FaShieldHeart className="text-blue-500 text-xs" />
                  Board Certified Doctor
                </span>
              </div>
            </div>

            {/* HIGHLIGHT STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 text-xs">
                  <FaAward />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  {doctor.experience ? `${doctor.experience}+ Yrs` : "10+ Yrs"}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Clinical Practice</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 text-xs">
                  <FaStar />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  {doctor.rating ? `${doctor.rating} / 5.0` : "4.9 / 5.0"}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Patient Rating</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 text-xs">
                  <FaCalendarCheck />
                </div>
                <h4 className="text-xl font-bold text-slate-900">2,500+</h4>
                <p className="text-xs text-slate-500 mt-0.5">Consultations</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2 text-xs">
                  <FaClock />
                </div>
                <h4 className="text-xl font-bold text-slate-900">100%</h4>
                <p className="text-xs text-slate-500 mt-0.5">On-Time Visits</p>
              </div>
            </div>

            {/* ABOUT SECTION */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                About Dr. {doctor.name?.replace(/^Dr\.\s*/i, "")}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {doctor.description ||
                  `${doctor.name} is a highly accomplished specialist in ${doctor.specialization} with years of dedicated experience diagnosing and managing complex cases with the highest standard of patient care.`}
              </p>
            </div>

            {/* TRUST GUARANTEES */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Ready to schedule your consultation?
                </h4>
                <p className="text-xs text-slate-600">
                  Choose an available time slot and receive instant SMS/Email confirmation.
                </p>
              </div>

              <Link
                to={`/book?doctorId=${doctor._id}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
              >
                <span>Select Appointment Slot</span>
                <FaCalendarCheck className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

