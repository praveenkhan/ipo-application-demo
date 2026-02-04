import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import "./Doctors.css";
import { useLocation } from "react-router-dom";


const API_URL = `${API_BASE_URL}/api/doctors`;

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState(selectedSpec);


  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ SINGLE SEARCH — NAME OR SPECIALIZATION
  const filteredDoctors = doctors.filter((doc) => {
    const query = search.toLowerCase();

    return (
      (doc.name || "").toLowerCase().includes(query) ||
      (doc.specialization || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="doctors-page">
      <h2 className="title">Our Doctors</h2>

      {/* ONE PROFESSIONAL SEARCH BAR */}
      <div className="doctor-search">
        <input
          type="text"
          placeholder="Search doctor or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map((doc) => (
          <div key={doc._id} className="doctor-card">
            <div className="avatar">{doc.name ? doc.name.charAt(0) : "?"}</div>

            <h3 className="doctor-name">{doc.name}</h3>
            <p className="specialization">{doc.specialization}</p>

            {doc.experience && (
              <p className="detail">Experience: {doc.experience} years</p>
            )}

            {doc.rating && <p className="detail">Rating: ⭐ {doc.rating}</p>}

            <Link to={`/doctor/${doc._id}`} className="btn-view">
              View Profile
            </Link>
          </div>
        ))}

        {filteredDoctors.length === 0 && (
          <p className="no-results">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;
