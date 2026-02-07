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
  
  <div className="auth-page">

    <div className="auth-container">

      {/* LEFT CONTENT */}

      <div className="auth-left">
        <h4>Hospital</h4>

        <h1>
          BOOK<br />APPOINTMENTS
        </h1>

        <p>
          Manage your healthcare digitally.<br />
          Schedule doctors instantly.
        </p>
      </div>

      {/* RIGHT REGISTER CARD */}

      <form className="auth-card" onSubmit={handleRegister}>

        <h2>Register</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

        <button>Create Account</button>

        <p>
          Already user? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>

  </div>
);
  
}
