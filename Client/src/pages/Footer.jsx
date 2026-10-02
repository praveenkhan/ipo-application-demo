import { Link } from "react-router-dom";
import {
  FaHospital,
  FaPhoneVolume,
  FaEnvelope,
  FaLocationDot,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaShieldHeart,
  FaArrowRight,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden border-t border-slate-800">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP EMERGENCY CALLOUT BAR */}
      <div className="border-b border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center text-lg">
              <FaPhoneVolume />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Emergency & Trauma Assistance (24/7)
              </p>
              <h4 className="text-lg font-bold text-white tracking-wide">
                Toll Free: 108 / Direct: +91 98765 43210
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 transition"
            >
              <span>Book Appointment</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* BRAND COLUMN & NEWSLETTER */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <FaHospital className="text-xl" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Hospital<span className="text-blue-500">+</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Hospital+ provides exceptional clinical healthcare services, trusted multi-specialty doctors, and seamless digital appointments.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                Subscribe for Health Updates
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing to our health newsletter!");
                }}
                className="flex items-center rounded-full bg-slate-800/80 border border-slate-700 p-1 max-w-md focus-within:border-blue-500 transition"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 outline-none flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow transition cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* QUICK LINKS: SERVICES */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/doctors" className="hover:text-white transition">
                  Doctor Consultations
                </Link>
              </li>
              <li>
                <Link to="/specialization" className="hover:text-white transition">
                  Medical Departments
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition">
                  Instant Slot Booking
                </Link>
              </li>
              <li>
                <a href="tel:108" className="hover:text-white transition">
                  24/7 Emergency Care
                </a>
              </li>
              <li>
                <span className="text-slate-500">Diagnostic Laboratory</span>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS: PATIENT HELP */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Patient Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/my-appointments" className="hover:text-white transition">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Billing & Insurance</span>
              </li>
              <li>
                <span className="text-slate-500">Patient Rights & FAQ</span>
              </li>
              <li>
                <span className="text-slate-500">Feedback & Support</span>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS: HOSPITAL INFO */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2.5">
                <FaLocationDot className="text-blue-500 text-sm mt-1 flex-shrink-0" />
                <span>124 Medical Plaza, Central City Healthcare Campus</span>
              </p>
              <p className="flex items-center gap-2.5">
                <FaPhoneVolume className="text-blue-500 text-xs flex-shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2.5">
                <FaEnvelope className="text-blue-500 text-xs flex-shrink-0" />
                <span>care@hospitalplus.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT & SOCIALS */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Hospital+ Medical Services. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <FaShieldHeart className="text-emerald-500 text-xs" />
              Verified & Secure Patient Platform
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <FaFacebookF className="text-xs" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-400 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <FaXTwitter className="text-xs" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <FaInstagram className="text-xs" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <FaLinkedinIn className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

