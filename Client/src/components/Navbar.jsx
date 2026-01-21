import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Register & Login page-ல navbar hide
  if (location.pathname === "/register" || location.pathname === "/login") {
    return null;
  }

  function logout() {
    localStorage.clear();
    navigate("/register");
  }

  return (
    <nav style={{ padding: "10px", background: "#f4f4f4" }}>
      <Link to="/home">Home</Link>
      {" | "}
      <Link to="/book">Book Appointment</Link>
      {" | "}
      <Link to="/my-appointments">My Appointments</Link>
      {" | "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
