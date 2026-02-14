import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import API_BASE_URL from "../config/api";
import doctorImg from "../assets/img/bg-img/hero2.png";
import { specializationImages } from "../data/specializationImages";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Specialization() {
  const [search, setSearch] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${API_URL}?limit=100`)
      .then(res => res.json())
      .then(result => {
        const doctors = result.data || result || [];

        const unique = {};

        doctors.forEach(doc => {
          if (doc.specialization && !unique[doc.specialization]) {
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

  const filtered = useMemo(() => {
    return specialties.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [specialties, search]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedSpecialties = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading)
    return <p className="text-center mt-40 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[120px]">

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-14 items-center py-20">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Find Your Specialization
          </h1>

          <p className="text-gray-500 mb-8">
            Browse medical specializations and book appointments instantly.
          </p>

          {filtered[0] && (
            <Link
              to={`/doctors?specialization=${encodeURIComponent(filtered[0].name)}`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg"
            >
              View Doctors
            </Link>
          )}
        </div>

        <div className="text-center">
          <img src={doctorImg} className="mx-auto max-h-[360px]" />
        </div>

      </section>

      {/* SEARCH */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-5">Search Specializations</h2>

        <input
          className="border rounded-xl px-5 py-3 w-full max-w-lg mx-auto"
          placeholder="Search specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">

        {paginatedSpecialties.map(s => (
          <div
            key={s.name}
            className="bg-white rounded-xl shadow hover:shadow-xl transition p-5 flex flex-col"
          >
            <img
              src={specializationImages[s.name] || doctorImg}
              className="h-40 object-contain mb-6 mx-auto"
              alt={s.name}
            />

            <h4 className="text-blue-600 font-semibold mb-2">{s.name}</h4>

            <p className="text-gray-500 mb-6 text-sm">{s.description}</p>

            <Link
              to={`/specialization/${encodeURIComponent(s.name)}`}
              className="mt-auto bg-blue-600 text-white text-center py-2 rounded-lg"
            >
              View Doctors
            </Link>
          </div>
        ))}

        {!paginatedSpecialties.length && (
          <p className="col-span-full text-center text-gray-500">
            No specialization found
          </p>
        )}

      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center pb-20 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-6 py-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="self-center text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}