import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";

import Register from "./pages/Register";
import Login from "./pages/LoginJoy";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "react-hot-toast";


export default function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  // ✅ Check admin page
  const isAdminPage =
    role === "admin" && location.pathname.startsWith("/admin");

  return (
    <>
      {/* 🔥 Navbar Switch */}
      {isAdminPage ? <AdminNavbar /> : <Navbar />}
      <Toaster position="top-right" />
      <Routes>
        {/* FIRST TIME USER */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* PUBLIC */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PATIENT */}
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />

        {/* ADMIN */}
        <Route path="/admin" element={ role === "admin" ? <AdminDashboard /> : <Navigate to="/home" />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
