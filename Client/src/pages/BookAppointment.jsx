import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config/api";
import heroImg from "../assets/img/bg-img/breadcumb1.jpg";

const DOCTOR_API = `${API_BASE_URL}/api/doctors`;
const BOOK_API = `${API_BASE_URL}/api/appointments`;

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");

  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  const [form, setForm] = useState({
    patientName: "",
    doctorId: searchParams.get("doctorId") || "",
    date: "",
    time: "",
  });

  /* LOAD DOCTORS */
  useEffect(() => {
    fetch(`${DOCTOR_API}?limit=100`)
      .then(res => res.json())
      .then(result => {
        setDoctors(result.data || []);
      })
      .catch(() => toast.error("Doctor load failed"));
  }, []);

  /* LOAD SLOTS */
  useEffect(() => {
    if (!form.doctorId || !form.date) return;

    fetch(`${API_BASE_URL}/api/appointments/available/${form.doctorId}/${form.date}`)
      .then(res => res.json())
      .then(res => {
        const list = res.data || res || [];
        setSlots(list.map(s => s.time || s));
        setForm(f => ({ ...f, time: "" }));
      })
      .catch(() => setSlots([]));

  }, [form.doctorId, form.date]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Login first");

    if (!form.patientName || !form.doctorId || !form.date || !form.time)
      return toast.error("Fill all fields");

    try {
      const res = await fetch(BOOK_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      toast.success("Appointment booked");
      navigate("/my-appointments");

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="min-h-screen pt-[120px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center py-24">

        {/* FORM */}
        <form
          onSubmit={submit}
          className="bg-white/90 rounded-2xl shadow-2xl p-8 space-y-5 max-w-md"
        >
          <h3 className="text-2xl font-semibold">Book Appointment</h3>

          <input
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={change}
            className="w-full border px-4 py-3 rounded"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={change}
            className="w-full border px-4 py-3 rounded"
          />

          <select
            name="doctorId"
            value={form.doctorId}
            onChange={change}
            className="w-full border px-4 py-3 rounded"
          >
            <option value="">Select Doctor</option>

            {doctors.map(d => (
              <option key={d._id} value={d._id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select>

          <select
            name="time"
            value={form.time}
            onChange={change}
            disabled={!slots.length}
            className="w-full border px-4 py-3 rounded disabled:bg-gray-100"
          >
            <option value="">
              {slots.length ? "Select Time" : "No Slots"}
            </option>

            {slots.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Book Appointment
          </button>
        </form>

        {/* HERO */}
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-6">
            Smart Hospital<br />Appointment Booking
          </h1>

          <p className="mb-6">
            Choose doctor, pick time, confirm instantly.
          </p>

          <div className="flex gap-6 text-sm">
            <span>✔ Trusted Doctors</span>
            <span>✔ Instant Booking</span>
            <span>✔ Secure</span>
          </div>
        </div>

      </div>
    </div>
  );
}