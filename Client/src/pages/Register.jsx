import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config/api";
import {
  FaHospital,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaArrowRight,
  FaCircleCheck,
  FaShieldHeart,
  FaUserDoctor,
} from "react-icons/fa6";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.name.trim().length < 3)
      return toast.error("Name must be at least 3 characters");

    if (!form.email.includes("@")) return toast.error("Enter valid email");

    if (form.phone.length !== 10)
      return toast.error("Enter valid 10-digit phone number");

    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Healthcare Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-12 gap-8 items-center py-6">
        {/* LEFT BRAND PANEL */}
        <div className="hidden md:flex md:col-span-6 flex-col justify-center text-white pr-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <FaHospital className="text-2xl" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                Hospital<span className="text-blue-400">+</span>
              </span>
              <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">
                Healthcare Portal
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4 text-white">
            Join Hospital+ Patient Care Network
          </h1>

          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Create your patient account to book appointments instantly, receive consultation reminders, and track your clinical health history.
          </p>

          <div className="space-y-3.5 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <FaCircleCheck />
              </div>
              <span>Fast 1-minute patient registration</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <FaCircleCheck />
              </div>
              <span>Real-time availability of 150+ specialist doctors</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <FaShieldHeart />
              </div>
              <span>100% Secure & HIPAA-compliant health data</span>
            </div>
          </div>
        </div>

        {/* REGISTER CARD */}
        <div className="md:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                <FaUserDoctor />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to register as a patient
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <FaUser className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
                  <input
                    name="name"
                    value={form.name}
                    placeholder="e.g. John Doe"
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="name@example.com"
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number (10 digits)
                </label>
                <div className="relative flex items-center">
                  <FaPhone className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
                  <input
                    name="phone"
                    value={form.phone}
                    placeholder="9876543210"
                    maxLength={10}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-3.5 text-slate-400 text-xs pointer-events-none" />
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all text-sm disabled:opacity-50 cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>

              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

