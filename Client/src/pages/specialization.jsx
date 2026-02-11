import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import doctorImg from "../assets/img/bg-img/hero2.png";
import { specializationImages } from "../data/specializationImages";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Specialization() {
  const [search, setSearch] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
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
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = specialties.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return <p className="text-center mt-40 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[120px]">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-14 items-center py-20">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Find Your Specialization
          </h1>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Browse our wide range of medical specializations and schedule
            appointments with qualified healthcare professionals.
          </p>

          {filtered[0] && (
            <Link
              to={`/doctors?specialization=${encodeURIComponent(filtered[0].name)}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg shadow"
            >
              View Doctors
            </Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="text-center">
          <img
            src={doctorImg}
            className="mx-auto max-h-[360px] drop-shadow-xl"
          />
        </div>
      </section>

      {/* SEARCH */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-5">Search Specializations</h2>

        <input
          className="border rounded-xl px-5 py-3 w-full max-w-lg mx-auto outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
        {filtered.map((s) => (
          <div
            key={s.name}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col"
          >
            <img
              src={specializationImages[s.name]}
              className="h-40 object-contain mb-6 mx-auto group-hover:scale-105 transition"
              alt={s.name}
            />

            <h4 className="text-blue-600 text-lg font-semibold mb-2">
              {s.name}
            </h4>

            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              {s.description}
            </p>

            <Link
              to={`/specialization/${encodeURIComponent(s.name)}`}
              className="mt-auto bg-blue-600 hover:bg-blue-700 transition text-white text-center py-2 rounded-lg"
            >
              View Doctors
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
