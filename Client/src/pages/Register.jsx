import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config/api";
import "./Register.css";

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
    <div className="register-wrapper">
      {/* LEFT PANEL */}
      <div className="register-left">
        <div className="brand-box">
          <h1>Hospital</h1>
          <p>Appointment Booking System</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="register-right">
        <form className="register-card" onSubmit={handleRegister}>
          <span className="subtitle">REGISTER</span>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button>Create Account</button>

          <p className="login-link">
            Already user? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
