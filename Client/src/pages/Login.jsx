import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT BRAND PANEL */}
        <div className="text-white hidden md:block">
          <h4 className="text-xl font-semibold mb-4">Hospital+</h4>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Book Doctor
            <br />
            Appointments
          </h1>

          <p className="text-lg opacity-90 max-w-sm">
            Manage your healthcare digitally. Schedule doctors instantly with
            our secure medical platform.
          </p>
        </div>

        {/* LOGIN CARD */}
        <form
          onSubmit={handleLogin}
          className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl p-8 space-y-4 max-w-md w-full mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition text-white py-3 rounded-lg shadow-lg">
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600">
            New user?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
