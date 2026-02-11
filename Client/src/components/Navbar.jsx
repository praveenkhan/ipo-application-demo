import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full bg-blue-600 text-white text-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <p>
            Welcome to <span className="font-semibold">Hospital Booking</span>
          </p>
          <p>Mon–Sat 8am–10pm | +91 9876543210</p>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="fixed top-[36px] left-0 w-full bg-white shadow z-40">
        <div className="max-w-7xl mx-auto px-6 h-[84px] flex items-center justify-between">
          {/* LOGO */}
          <div className="text-2xl font-bold">
            Hospital<span className="text-blue-600">+</span>
          </div>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <NavLink to="/home" className={navClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctors" className={navClass}>
                Doctors
              </NavLink>
            </li>

            <li>
              <NavLink to="/book" className={navClass}>
                Book
              </NavLink>
            </li>

            <li>
              <NavLink to="/my-appointments" className={navClass}>
                Appointments
              </NavLink>
            </li>
          </ul>

          {/* ACTIONS */}
          <div className="hidden md:flex gap-4 items-center">
            <a
              href="tel:108"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              EMERGENCY
            </a>

            <button
              onClick={logout}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU ICON */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/doctors"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Doctors
            </NavLink>

            <NavLink
              to="/book"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Book
            </NavLink>

            <NavLink
              to="/my-appointments"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Appointments
            </NavLink>

            <div className="pt-4 border-t flex gap-4">
              <a
                href="tel:108"
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                EMERGENCY
              </a>

              <button onClick={logout} className="border px-4 py-2 rounded">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
