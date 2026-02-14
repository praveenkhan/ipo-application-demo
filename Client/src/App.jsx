import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./admin/Navbar";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Appointments from "./admin/Appointments";
import AdminDoctors from "./admin/AdminDoctors";
import Analytics from "./admin/Analytics";
import Settings from "./admin/Settings";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import { Toaster } from "react-hot-toast";
import Specialization from "./pages/specialization";
import Footer from "./pages/Footer";

export default function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  // ✅ Check admin page
  const isAdminPage =
    role === "admin" && location.pathname.startsWith("/admin");

  // ✅ Check patient pages for footer
  const patientPages = [
    "/home",
    "/doctors",
    "/specialization",
    "/doctor",
    "/book",
    "/my-appointments",
  ];
  const isPatientPage = patientPages.some((page) =>
    location.pathname.startsWith(page),
  );

  return (
    <>
      {/* 🔥 Navbar Switch - Only show if NOT in admin (AdminLayout handles its own) OR specific conditions */}
      {!isAdminPage && <Navbar />}

      <Toaster position="top-right" />
      <Routes>

  {/* FIRST TIME */}
  <Route path="/" element={<Navigate to="/register" />} />

  {/* PUBLIC */}
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  {/* 🔐 PATIENT PROTECTED */}
  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

  <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
  <Route path="/specialization" element={<ProtectedRoute><Specialization /></ProtectedRoute>} />
  <Route path="/specialization/:name" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />

  <Route path="/doctor/:id" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />

  <Route path="/book" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />

  <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />

  {/* 🔐 ADMIN */}
  <Route
    path="/admin"
    element={
      role === "admin"
        ? <AdminLayout />
        : <Navigate to="/login" />
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="appointments" element={<Appointments />} />
    <Route path="doctors" element={<AdminDoctors />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="settings" element={<Settings />} />
  </Route>

  {/* FALLBACK */}
  <Route path="*" element={<Navigate to="/login" />} />

</Routes>
      {isPatientPage && <Footer />}
    </>
  );
}
