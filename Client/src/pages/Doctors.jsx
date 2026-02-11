import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Doctors() {
  const { name } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (name) setSearch(decodeURIComponent(name));
  }, [name]);

  const filteredDoctors = doctors.filter((doc) => {
    const query = search.toLowerCase();
    return (
      (doc.name || "").toLowerCase().includes(query) ||
      (doc.specialization || "").toLowerCase().includes(query)
    );
  });

  if (loading)
    return (
      <p className="text-center pt-[140px] text-gray-500">Loading doctors...</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[140px] pb-20">
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-10">Our Doctors</h2>

      {/* SEARCH */}
      <div className="flex justify-center mb-12">
        <input
          type="text"
          placeholder="Search doctor or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-5 py-3 w-full max-w-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 text-center flex flex-col"
          >
            {/* AVATAR */}
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {doc.name ? doc.name.charAt(0) : "?"}
            </div>

            <h3 className="font-semibold text-lg mb-1">{doc.name}</h3>

            <p className="text-blue-600 text-sm mb-2">{doc.specialization}</p>

            {doc.experience && (
              <p className="text-gray-500 text-sm mb-1">
                Experience: {doc.experience} years
              </p>
            )}

            {doc.rating && (
              <p className="text-gray-500 text-sm mb-4">⭐ {doc.rating}</p>
            )}

            <Link
              to={`/doctor/${doc._id}`}
              className="mt-auto bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {filteredDoctors.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No doctors found.</p>
      )}
    </div>
  );
}
