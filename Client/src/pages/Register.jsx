import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config/api";

export default function Register() {
  const navigate = useNavigate();

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
      return toast.error("Enter valid phone number");

    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
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

        {/* REGISTER CARD */}
        <form
          onSubmit={handleRegister}
          className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl p-8 space-y-4 max-w-md w-full mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition text-white py-3 rounded-lg shadow-lg">
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600">
            Already user?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
