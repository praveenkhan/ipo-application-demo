import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "./Login.css";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // role based redirect
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };


 return (
   <div className="glass-page">
     <div className="glass-container">
       {/* LEFT CONTENT */}

       <div className="glass-left">
         <h4>Hospital</h4>

         <h1>
           BOOK
           <br />
           APPOINTMENTS
         </h1>

         <p>
           Manage your healthcare digitally.
           <br />
           Schedule doctors instantly.
         </p>
       </div>

       {/* RIGHT LOGIN */}

       <form className="login-card" onSubmit={handleLogin}>
         <h2 className="login-title">Login</h2>

         <label>Email</label>
         <input
           name="email"
           value={form.email}
           onChange={handleChange}
           placeholder="Enter email"
         />

         <label>Password</label>
         <input
           type="password"
           name="password"
           value={form.password}
           onChange={handleChange}
           placeholder="Password"
         />

         <button>Sign In</button>

         <p className="login-footer">
           New user? <Link to="/register">Create Account</Link>
         </p>
       </form>
     </div>
   </div>
 );
 }

