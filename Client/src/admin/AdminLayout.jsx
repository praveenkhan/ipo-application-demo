import { NavLink, useNavigate, Outlet, Link } from "react-router-dom";
import {
  FaHospital,
  FaChartPie,
  FaCalendarCheck,
  FaUserDoctor,
  FaChartLine,
  FaGear,
  FaArrowRightFromBracket,
  FaHouseMedical,
  FaUserTie,
} from "react-icons/fa6";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 shadow-xl">
        {/* LOGO */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/80 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <FaHospital className="text-lg" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white leading-none">
              Hospital<span className="text-blue-400">+</span>
            </h2>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Admin Portal
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-3.5 py-6 space-y-1.5 text-sm">
          <SidebarLink
            to="/admin"
            end
            icon={<FaChartPie className="text-base" />}
            label="Dashboard"
          />
          <SidebarLink
            to="/admin/appointments"
            icon={<FaCalendarCheck className="text-base" />}
            label="Appointments"
          />
          <SidebarLink
            to="/admin/doctors"
            icon={<FaUserDoctor className="text-base" />}
            label="Doctors"
          />
          <SidebarLink
            to="/admin/analytics"
            icon={<FaChartLine className="text-base" />}
            label="Analytics"
          />
          <SidebarLink
            to="/admin/settings"
            icon={<FaGear className="text-base" />}
            label="Settings"
          />

          <div className="pt-4 mt-4 border-t border-slate-800/60">
            <Link
              to="/home"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs font-semibold"
            >
              <FaHouseMedical className="text-sm text-blue-400" />
              <span>Back to Patient Portal</span>
            </Link>
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <FaArrowRightFromBracket />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-20 bg-white border-b border-slate-200/80 flex items-center justify-between px-8 shadow-xs">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Hospital Management Console
            </h1>
            <p className="text-xs text-slate-500">
              Real-time patient visits, doctor schedules, and clinical operations
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Admin User</p>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Manager
              </p>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20 font-bold text-sm">
              <FaUserTie />
            </div>
          </div>
        </header>

        {/* OUTLET */}
        <main className="p-6 sm:p-8 flex-1 overflow-auto bg-slate-50">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all ${
          isActive
            ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30"
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

