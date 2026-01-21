import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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
      return alert("Name must be at least 3 characters");

    if (!form.email.includes("@")) return alert("Enter valid email");

    if (form.phone.length !== 10) return alert("Enter valid phone number");

    if (form.password.length < 6)
      return alert("Password must be at least 6 characters");

    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
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
