import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import "./Home.css";

const API_URL = `${API_BASE_URL}/api/doctors`;

function Home() {
  const [specialties, setSpecialties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // 🔥 extract unique specializations
        const unique = {};
        data.forEach((doc) => {
          if (!unique[doc.specialization]) {
            unique[doc.specialization] = {
              name: doc.specialization,
              description: doc.description || "Expert medical care",
            };
          }
        });
        setSpecialties(Object.values(unique));
      });
  }, []);

  const filtered = specialties.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero">
        <h1 className="title">Hospital Appointment Booking System</h1>
        <p className="subtitle">
          Book doctor appointments instantly, view visits, manage your health.
        </p>

        <div className="hero-buttons">
          {/* 🔥 Book goes to doctors */}
          <Link to="/doctors" className="btn btn-primary">
            Book Appointment
          </Link>

          <Link to="/my-appointments" className="btn btn-secondary">
            My Appointments
          </Link>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">
        <h2 className="section-title">Find Your Doctor</h2>
        <div className="search-bar">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search specialty..."
          />
        </div>
      </section>

      {/* SPECIALTIES */}
      <div className="specialties-grid">
        {filtered.map((s) => (
          <div key={s.name} className="specialty-card">
            <h3>{s.name}</h3>
            <p>{s.description}</p>

            <Link
              to={`/doctors?specialization=${encodeURIComponent(s.name)}`}
              className="book-btn"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section className="about">
        <h2 className="section-title">About Our Hospital</h2>
        <p>
          We are committed to providing quality healthcare with experienced
          doctors, modern medical facilities, and patient-focused care.
        </p>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Hospital Booking System</p>
      </footer>
    </div>
  );
}

export default Home;
