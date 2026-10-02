import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaCircleCheck,
  FaShieldHeart,
  FaUserDoctor,
} from "react-icons/fa6";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Welcome back!");
      if (res.data.role === "admin") navigate("/admin");
      else navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Healthcare Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-12 gap-8 items-center">
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
            Access Your Healthcare & Appointments
          </h1>

          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Sign in to schedule doctor visits, manage your appointments, view clinic history, and connect with top specialists.
          </p>

          <div className="space-y-3.5 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <FaCircleCheck />
              </div>
              <span>Verified Specialists & Department Heads</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <FaCircleCheck />
              </div>
              <span>Instant Appointment Booking & Reminders</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                <FaShieldHeart />
              </div>
              <span>Encrypted & Confidential Health Records</span>
            </div>
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="md:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                <FaUserDoctor />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your credentials to sign in to your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-800 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all text-sm disabled:opacity-50 cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Create Account
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

