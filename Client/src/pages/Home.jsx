import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import img1 from "../assets/img/bg-img/hero1.jpg";
import img2 from "../assets/img/blog-img/home3.jpg";
import img3 from "../assets/img/bg-img/hero3.jpg";
import { getSpecializationImage } from "../data/specializationImages";
import {
  FaUserDoctor,
  FaCalendarCheck,
  FaArrowRight,
  FaTruckMedical,
  FaStethoscope,
  FaHospitalUser,
  FaAward,
  FaShieldHeart,
  FaClockRotateLeft,
  FaMicroscope,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa6";
import { RiCalendarScheduleLine } from "react-icons/ri";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Home() {
  const [specialties, setSpecialties] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}?limit=100`)
      .then((res) => res.json())
      .then((result) => {
        const doctors = result.data || result || [];

        const unique = {};

        doctors.forEach((doc) => {
          if (doc.specialization && !unique[doc.specialization]) {
            unique[doc.specialization] = {
              name: doc.specialization,
              description: doc.description || "Expert clinical healthcare and specialized treatment.",
            };
          }
        });

        setSpecialties(Object.values(unique));
      })
      .catch(() => setSpecialties([]));
  }, []);

  const slides = [
    {
      img: img1,
      badge: "Trusted Medical Care",
      title: "Smart Hospital Appointment Booking",
      desc: "Connect with world-class specialists and schedule your doctor consultations in seconds.",
    },
    {
      img: img2,
      badge: "Verified Medical Specialists",
      title: "Find The Best Doctors Near You",
      desc: "Access verified reviews, comprehensive clinical backgrounds, and real-time available time slots.",
    },
    {
      img: img3,
      badge: "Seamless Healthcare",
      title: "Manage Your Visits & Health Digitally",
      desc: "Track appointment statuses, reschedule on-demand, and keep your care on schedule.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* HERO CAROUSEL */}
      <section className="relative h-[85vh] min-h-[580px] max-h-[780px] mt-[120px] overflow-hidden">
        {/* Background Images */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transition: "opacity 1s ease-in-out, transform 7s ease" }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dynamic Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-950/40" />

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl text-white">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              {slides[index].badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-5 drop-shadow-sm">
              {slides[index].title}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-8 max-w-xl">
              {slides[index].desc}
            </p>

            {/* CTA Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Book Appointment</span>
                <FaArrowRight className="text-sm" />
              </Link>

              <Link
                to="/my-appointments"
                className="inline-flex items-center gap-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-200"
              >
                <RiCalendarScheduleLine className="text-lg" />
                <span>My Appointments</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Controls & Indicators */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-none">
          {/* Dots */}
          <div className="flex items-center gap-2.5 pointer-events-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  i === index
                    ? "w-8 bg-blue-500 shadow-sm"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() =>
                setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
              }
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS / PILLARS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 -mt-10 sm:-mt-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={<FaTruckMedical className="text-red-600 text-2xl" />}
            iconBg="bg-red-50 text-red-600 border-red-100"
            title="Emergency Care"
            desc="24/7 immediate trauma and ambulance support."
            link="tel:108"
            linkText="Call 108"
            isExternal
          />

          <FeatureCard
            icon={<FaUserDoctor className="text-blue-600 text-2xl" />}
            iconBg="bg-blue-50 text-blue-600 border-blue-100"
            title="Qualified Doctors"
            desc="Top certified specialists across all major clinical fields."
            link="/doctors"
            linkText="View Doctors"
          />

          <FeatureCard
            icon={<FaCalendarCheck className="text-emerald-600 text-2xl" />}
            iconBg="bg-emerald-50 text-emerald-600 border-emerald-100"
            title="Instant Scheduling"
            desc="Pick preferred slots and get instant confirmations."
            link="/book"
            linkText="Book a Slot"
          />

          <FeatureCard
            icon={<FaMicroscope className="text-indigo-600 text-2xl" />}
            iconBg="bg-indigo-50 text-indigo-600 border-indigo-100"
            title="Modern Diagnostics"
            desc="Advanced laboratory testing and radiology equipment."
            link="/specialization"
            linkText="Departments"
          />
        </div>
      </section>

      {/* HOSPITAL STATS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-50/60 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <Stat
              icon={<FaHospitalUser className="text-blue-600 text-xl" />}
              num="12,000+"
              label="Patients Served"
              desc="Satisfied individuals treated"
            />
            <Stat
              icon={<FaUserDoctor className="text-blue-600 text-xl" />}
              num="150+"
              label="Specialist Doctors"
              desc="Board-certified practitioners"
            />
            <Stat
              icon={<FaCalendarCheck className="text-blue-600 text-xl" />}
              num="5,000+"
              label="Appointments"
              desc="Seamlessly scheduled"
            />
            <Stat
              icon={<FaAward className="text-blue-600 text-xl" />}
              num="20+"
              label="Specializations"
              desc="Comprehensive departments"
            />
          </div>
        </div>
      </section>

      {/* SPECIALIZATION SHOWCASE */}
      {specialties.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -right-16 -top-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/20">
                  <FaStethoscope className="text-xs" />
                  Medical Departments
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Find Your Specialization & Expert Doctor
                </h2>

                <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">
                  Choose from our wide variety of clinical specialties. Whether you require cardiology, dermatology, pediatrics, or orthopedic surgery, we have the right expert for you.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/specialization"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5"
                  >
                    <span>Browse All Specializations</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                  <Link
                    to="/doctors"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition"
                  >
                    <span>View All Doctors</span>
                  </Link>
                </div>
              </div>

              {/* Specialization Preview Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {specialties.slice(0, 4).map((spec) => (
                  <Link
                    key={spec.name}
                    to={`/specialization/${encodeURIComponent(spec.name)}`}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 transition group flex flex-col"
                  >
                    <div className="relative w-full h-24 rounded-xl overflow-hidden mb-3 bg-slate-800">
                      <img
                        src={getSpecializationImage(spec.name)}
                        alt={spec.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white text-[11px] font-bold">
                        <FaStethoscope className="text-blue-300 text-[10px]" />
                        <span className="truncate">{spec.name}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {spec.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US / ABOUT */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Why Choose Hospital+
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
            Patient-Centered Healthcare You Can Trust
          </h2>
          <p className="text-slate-600 text-base">
            We are dedicated to providing state-of-the-art clinical expertise, compassionate care, and seamless digital booking to ensure your health comes first.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TrustCard
            icon={<FaShieldHeart className="text-blue-600 text-2xl" />}
            title="Certified Clinical Quality"
            desc="Our hospital follows global hygiene and clinical protocols to ensure the safest treatment standards for every patient."
          />
          <TrustCard
            icon={<FaClockRotateLeft className="text-blue-600 text-2xl" />}
            title="Zero Wait Booking"
            desc="Book your preferred doctor and time slot in seconds. Receive immediate reminders and digital appointment updates."
          />
          <TrustCard
            icon={<FaUserDoctor className="text-blue-600 text-2xl" />}
            title="Top Medical Faculty"
            desc="Renowned surgeons, physicians, and specialists with decades of combined clinical and surgical excellence."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, iconBg, title, desc, link, linkText, isExternal }) {
  const CardContent = (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full group">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${iconBg} group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-base mb-1.5">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
        {desc}
      </p>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
        {linkText}
        <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  );

  return isExternal ? (
    <a href={link}>{CardContent}</a>
  ) : (
    <Link to={link}>{CardContent}</Link>
  );
}

function Stat({ icon, num, label, desc }) {
  return (
    <div className="p-4 sm:p-6 text-center">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        {num}
      </h3>
      <p className="font-semibold text-slate-800 text-sm mt-1">{label}</p>
      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
    </div>
  );
}

function TrustCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}