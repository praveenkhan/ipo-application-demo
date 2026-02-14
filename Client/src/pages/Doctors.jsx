import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Doctors() {
  const { name } = useParams(); // For /specialization/:name
  const location = useLocation(); // For ?specialization=...

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState(() => {
    // Priority: 1. URL Param (/specialization/:name) 
    //           2. Query Param (?specialization=...)
    if (name) return decodeURIComponent(name);

    const queryParams = new URLSearchParams(location.search);
    const spec = queryParams.get("specialization");
    return spec ? decodeURIComponent(spec) : "";
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Sync search state with URL params
  useEffect(() => {
    if (name) {
      setSearch(decodeURIComponent(name));
      setPage(1);
    } else {
      const querySpec = new URLSearchParams(location.search).get("specialization");
      if (querySpec) {
        setSearch(decodeURIComponent(querySpec));
        setPage(1);
      }
    }
  }, [name, location.search]);

  useEffect(() => {
    const fetchDoctors = () => {
      setLoading(true);
      const encodedSearch = encodeURIComponent(search);
      fetch(`${API_URL}?page=${page}&limit=12&search=${encodedSearch}`)
        .then((res) => res.json())
        .then((result) => {
          setDoctors(result.data || []);
          setTotalPages(result.totalPages || 1);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    // Debounce search
    const timer = setTimeout(fetchDoctors, 500);
    return () => clearTimeout(timer);
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  if (loading && doctors.length === 0)
    return (
      <p className="text-center pt-40 text-gray-500">Loading doctors...</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
      <h2 className="text-3xl font-bold text-center mb-10">Our Doctors</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search doctor or specialization..."
          className="border rounded-xl px-5 py-3 w-full max-w-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white p-6 rounded-xl shadow text-center flex flex-col"
          >
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {doc.name?.charAt(0)}
            </div>

            <h3 className="font-semibold">{doc.name}</h3>
            <p className="text-blue-600 mb-4">{doc.specialization}</p>

            <Link
              to={`/doctor/${doc._id}`}
              className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

      {!loading && doctors.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No doctors found</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-4">
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