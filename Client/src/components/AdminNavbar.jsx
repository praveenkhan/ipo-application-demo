import { useNavigate } from "react-router-dom";
// import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <nav className="admin-navbar">
      <h2>Admin Dashboard</h2>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </nav>
  );
}
