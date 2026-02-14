import { NavLink, useNavigate, Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">Hospital+</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarLink to="/admin" label="Dashboard" />
          <SidebarLink to="/admin/appointments" label="Appointments" />
          <SidebarLink to="/admin/doctors" label="Doctors" />
          <SidebarLink to="/admin/analytics" label="Analytics" />
          <SidebarLink to="/admin/settings" label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1">
        {/* TOPBAR */}
        <header className="h-20 bg-white shadow flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-8">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded ${isActive ? "bg-blue-600" : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
