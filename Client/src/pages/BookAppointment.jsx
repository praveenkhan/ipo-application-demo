import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config/api";
import heroImg from "../assets/img/bg-img/breadcumb1.jpg";
import { getDoctorImage } from "../data/doctorImages";
import {
  FaUser,
  FaCalendarDays,
  FaUserDoctor,
  FaClock,
  FaArrowRight,
  FaCircleCheck,
  FaShieldHeart,
  FaHospital,
  FaPhoneVolume,
} from "react-icons/fa6";

const DOCTOR_API = `${API_BASE_URL}/api/doctors`;
const BOOK_API = `${API_BASE_URL}/api/appointments`;

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");

  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    doctorId: searchParams.get("doctorId") || "",
    date: "",
    time: "",
  });

  /* LOAD DOCTORS */
  useEffect(() => {
    fetch(`${DOCTOR_API}?limit=100`)
      .then((res) => res.json())
      .then((result) => {
        setDoctors(result.data || []);
      })
      .catch(() => toast.error("Doctor load failed"));
  }, []);

  /* LOAD SLOTS */
  useEffect(() => {
    if (!form.doctorId || !form.date) {
      setSlots([]);
      return;
    }

    setLoadingSlots(true);
    fetch(
      `${API_BASE_URL}/api/appointments/available/${form.doctorId}/${form.date}`
    )
      .then((res) => res.json())
      .then((res) => {
        const list = res.data || res || [];
        setSlots(list.map((s) => s.time || s));
        setForm((f) => ({ ...f, time: "" }));
        setLoadingSlots(false);
      })
      .catch(() => {
        setSlots([]);
        setLoadingSlots(false);
      });
  }, [form.doctorId, form.date]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const selectSlot = (slotTime) => {
    setForm({ ...form, time: slotTime });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Please login first");

    if (!form.patientName || !form.doctorId || !form.date || !form.time)
      return toast.error("Please fill in all fields");

    setSubmitting(true);
    try {
      const res = await fetch(BOOK_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      toast.success("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDoctor = doctors.find((d) => d._id === form.doctorId);

  return (
    <div className="bg-slate-50 min-h-screen pt-[120px] pb-24 relative overflow-hidden">
      {/* BACKGROUND BANNER */}
      <div
        className="absolute top-0 left-0 right-0 h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-blue-950/80 to-slate-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: HERO & VALUE PROPOSITION */}
          <div className="lg:col-span-5 text-white pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 text-xs font-semibold mb-5">
              <FaHospital className="text-xs" />
              <span>Easy Online Scheduling</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Book Your Doctor <br className="hidden sm:inline" />
              Appointment
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Schedule your clinic consultation with top medical experts in 4 quick steps. Instant confirmation with real-time slot selection.
            </p>

            {/* Selected Doctor Summary Card if Doctor Chosen */}
            {selectedDoctor && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-8 text-white">
                <p className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-2">
                  Selected Doctor
                </p>
                <div className="flex items-center gap-3.5">
                  <img
                    src={getDoctorImage(selectedDoctor)}
                    alt={selectedDoctor.name}
                    className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-white/40 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-base">{selectedDoctor.name}</h4>
                    <p className="text-xs text-blue-200">{selectedDoctor.specialization}</p>
                    {selectedDoctor.experience && (
                      <span className="inline-block text-[11px] text-emerald-300 mt-0.5">
                        {selectedDoctor.experience}+ years experience
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Assurance List */}
            <div className="space-y-4 text-slate-200 text-sm bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs flex-shrink-0">
                  <FaCircleCheck />
                </div>
                <span><strong>Instant Confirmation:</strong> Instant digital token.</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs flex-shrink-0">
                  <FaCircleCheck />
                </div>
                <span><strong>Zero Waiting Line:</strong> Pre-allocated verified slots.</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs flex-shrink-0">
                  <FaCircleCheck />
                </div>
                <span><strong>100% Confidential:</strong> Encrypted health data.</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-slate-300">
              <FaPhoneVolume className="text-blue-400" />
              <span>Need help? Call our booking desk at <strong>+91 98765 43210</strong></span>
            </div>
          </div>

          {/* RIGHT COLUMN: BOOKING FORM CARD */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Patient Appointment Form
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Please provide patient details and pick your convenient time
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                  <FaCalendarDays />
                </div>
              </div>

              <form onSubmit={submit} className="space-y-6">
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Patient Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaUser className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                    <input
                      name="patientName"
                      placeholder="e.g. John Doe"
                      value={form.patientName}
                      onChange={change}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Doctor / Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaUserDoctor className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                    <select
                      name="doctorId"
                      value={form.doctorId}
                      onChange={change}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">-- Choose a Medical Specialist --</option>
                      {doctors.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name} — {d.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Appointment Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaCalendarDays className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={change}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* Available Time Slots */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Available Time Slot <span className="text-red-500">*</span>
                    </label>
                    {loadingSlots && (
                      <span className="text-xs text-blue-600 animate-pulse font-medium">
                        Checking slots...
                      </span>
                    )}
                  </div>

                  {/* Interactive Slot Chips if slots are available */}
                  {slots.length > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                        {slots.map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => selectSlot(s)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              form.time === s
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
                            }`}
                          >
                            <FaClock className="text-[10px]" />
                            <span>{s}</span>
                          </button>
                        ))}
                      </div>

                      {/* Fallback hidden/sync select for accessibility and forms */}
                      <select
                        name="time"
                        value={form.time}
                        onChange={change}
                        required
                        className="hidden"
                      >
                        <option value="">Select Time</option>
                        {slots.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-4 text-center">
                      <p className="text-xs text-slate-500">
                        {form.doctorId && form.date
                          ? "No available slots for this date. Please try another date."
                          : "Please choose a doctor and date first to view open time slots."}
                      </p>
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform active:scale-[0.99]"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Confirm & Book Appointment</span>
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  By clicking Confirm, you agree to Hospital+'s appointment policy and digital health terms.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}