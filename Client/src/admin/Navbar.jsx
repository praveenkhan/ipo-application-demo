import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaTruckMedical,
  FaClock,
  FaPhoneVolume,
  FaBars,
  FaXmark,
  FaArrowRightFromBracket,
  FaHouseMedical,
  FaUserDoctor,
  FaCalendarCheck,
  FaHospital,
} from "react-icons/fa6";
import { RiCalendarScheduleLine } from "react-icons/ri";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  const navClass = ({ isActive }) =>
    `relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? "text-blue-600 bg-blue-50/80 shadow-xs font-semibold"
        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <>
      {/* TOP INFORMATION BAR */}
      <div className="fixed top-0 left-0 w-full bg-slate-900 text-slate-300 text-xs z-50 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Emergency & In-Patient Open
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
              <FaClock className="text-slate-400 text-[11px]" /> Mon–Sat: 8:00 AM – 10:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <FaPhoneVolume className="text-blue-400 text-[11px]" />
              <span className="font-semibold text-white">+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header
        className={`fixed top-[36px] left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
            : "bg-white/95 backdrop-blur-sm border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/home"
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <FaHospital className="text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                Hospital<span className="text-blue-600">+</span>
              </span>
              <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase mt-0.5">
                Healthcare Center
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            <NavLink to="/home" className={navClass}>
              <FaHouseMedical className="text-xs" />
              Home
            </NavLink>

            <NavLink to="/doctors" className={navClass}>
              <FaUserDoctor className="text-xs" />
              Doctors
            </NavLink>

            <NavLink to="/book" className={navClass}>
              <RiCalendarScheduleLine className="text-sm" />
              Book
            </NavLink>

            <NavLink to="/my-appointments" className={navClass}>
              <FaCalendarCheck className="text-xs" />
              Appointments
            </NavLink>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:108"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-red-500/20 hover:from-red-700 hover:to-rose-700 hover:shadow-lg hover:shadow-red-500/30 transition-all transform active:scale-95"
            >
              <FaTruckMedical className="text-sm animate-bounce" />
              <span>EMERGENCY 108</span>
            </a>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-red-600 bg-white hover:bg-red-50/80 border border-slate-200 hover:border-red-200 px-3.5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
              title="Sign out"
            >
              <FaArrowRightFromBracket className="text-xs" />
              <span>Logout</span>
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          >
            {open ? <FaXmark className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {open && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 py-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className={mobileNavClass}
            >
              <FaHouseMedical />
              Home
            </NavLink>

            <NavLink
              to="/doctors"
              onClick={() => setOpen(false)}
              className={mobileNavClass}
            >
              <FaUserDoctor />
              Doctors
            </NavLink>

            <NavLink
              to="/book"
              onClick={() => setOpen(false)}
              className={mobileNavClass}
            >
              <RiCalendarScheduleLine />
              Book Appointment
            </NavLink>

            <NavLink
              to="/my-appointments"
              onClick={() => setOpen(false)}
              className={mobileNavClass}
            >
              <FaCalendarCheck />
              My Appointments
            </NavLink>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="tel:108"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-bold py-3 rounded-xl shadow-md shadow-red-500/20"
              >
                <FaTruckMedical />
                EMERGENCY 108
              </a>

              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:text-red-600 bg-slate-50 border border-slate-200 py-2.5 rounded-xl hover:bg-red-50 transition"
              >
                <FaArrowRightFromBracket />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

