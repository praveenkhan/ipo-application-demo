import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center justify-between">
        {/* LEFT */}
        <div>
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Hospital Management System</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
