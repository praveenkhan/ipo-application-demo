import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { getDoctorImage } from "../data/doctorImages";
import { getSpecializationImage, specializationImages } from "../data/specializationImages";
import {
  FaMagnifyingGlass,
  FaXmark,
  FaUserDoctor,
  FaArrowRight,
  FaStar,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
  FaCircleCheck,
  FaCalendarCheck,
  FaStethoscope,
  FaClock,
} from "react-icons/fa6";

const API_URL = `${API_BASE_URL}/api/doctors`;

// Popular quick filter list
const popularSpecialties = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Gynecologist / Obstetrician",
  "Gastroenterologist",
  "Endocrinologist",
  "Oncologist",
  "Ophthalmologist",
  "ENT Specialist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "General Surgeon",
];

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
      const querySpec = new URLSearchParams(location.search).get(
        "specialization"
      );
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
    const timer = setTimeout(fetchDoctors, 400);
    return () => clearTimeout(timer);
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  const handleSpecialtyFilter = (specName) => {
    if (specName === "All") {
      setSearch("");
    } else {
      setSearch(specName);
    }
    setPage(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-[130px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-100">
            <FaUserDoctor className="text-xs" />
            <span>Verified Medical Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Find & Book Top Specialist Doctors
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose from board-certified medical professionals, browse clinical expertise, and schedule instant consultations.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <FaMagnifyingGlass className="absolute left-4 text-slate-400 text-base pointer-events-none" />
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search by doctor name (e.g. Dr. Priya, Dr. Kumar) or specialty..."
                className="w-full bg-white border border-slate-200/90 rounded-2xl pl-12 pr-10 py-3.5 text-slate-800 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  title="Clear search"
                >
                  <FaXmark className="text-base" />
                </button>
              )}
            </div>

            {search && (
              <p className="text-xs text-slate-500 mt-2.5 text-left pl-2 flex items-center justify-between">
                <span>
                  Filtering by: <strong className="text-blue-600 font-bold">"{search}"</strong>
                </span>
                <button
                  onClick={() => setSearch("")}
                  className="text-slate-400 hover:text-blue-600 underline text-[11px] cursor-pointer"
                >
                  Clear filter
                </button>
              </p>
            )}
          </div>
        </div>

        {/* SPECIALIZATION QUICK-FILTER STRIP */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FaStethoscope className="text-blue-600" />
              <span>Filter by Medical Department</span>
            </span>
            <Link
              to="/specialization"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              View all departments →
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
            {popularSpecialties.map((spec) => {
              const isActive =
                spec === "All"
                  ? !search
                  : search.toLowerCase().includes(spec.toLowerCase()) ||
                    spec.toLowerCase().includes(search.toLowerCase());

              return (
                <button
                  key={spec}
                  onClick={() => handleSpecialtyFilter(spec)}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all flex-shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {spec !== "All" && (
                    <img
                      src={getSpecializationImage(spec)}
                      alt={spec}
                      className="w-6 h-6 rounded-lg object-cover flex-shrink-0 border border-white/20"
                    />
                  )}
                  <span>{spec}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && doctors.length === 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-5 border border-slate-200 animate-pulse flex flex-col items-center space-y-4"
              >
                <div className="w-full h-52 bg-slate-100 rounded-2xl" />
                <div className="h-5 bg-slate-100 rounded-md w-3/4" />
                <div className="h-4 bg-slate-100 rounded-md w-1/2" />
                <div className="h-10 bg-slate-100 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* DOCTORS GRID WITH REALISTIC PROFILE PHOTOS */}
        {!loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => {
              const photoUrl = getDoctorImage(doc);

              return (
                <div
                  key={doc._id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col p-4 group"
                >
                  {/* DOCTOR IMAGE CONTAINER */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 bg-slate-100 aspect-square shadow-xs">
                    <img
                      src={photoUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                    {/* Verified Badge */}
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-emerald-100">
                      <FaCircleCheck className="text-emerald-500" />
                      Verified
                    </span>

                    {/* Department Badge On Image */}
                    <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold drop-shadow-md truncate">
                      {doc.specialization}
                    </span>
                  </div>

                  {/* DOCTOR DETAILS */}
                  <div className="px-1 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                        {doc.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                        <FaStar className="text-amber-500 text-[10px]" />
                        {doc.rating || "4.8"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">
                      {doc.description || "Expert clinical consultant and patient specialist."}
                    </p>

                    {/* Experience & Slots Badges */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                      <span className="inline-flex items-center gap-1">
                        <FaAward className="text-blue-600" />
                        <span><strong>{doc.experience || 10}+</strong> yrs experience</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                        <FaClock className="text-[10px]" />
                        <span>Available</span>
                      </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-auto space-y-2">
                      <Link
                        to={`/doctor/${doc._id}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-xs"
                      >
                        <span>View Profile</span>
                        <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        to={`/book?doctorId=${doc._id}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-xl border border-slate-200 text-xs transition"
                      >
                        <FaCalendarCheck className="text-[11px] text-blue-600" />
                        <span>Book Appointment</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && doctors.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FaUserDoctor className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Doctors Found</h3>
            <p className="text-slate-500 text-sm mb-6">
              We couldn't find any doctor matching "{search}". Try selecting a department above or clearing your search.
            </p>
            <button
              onClick={() => setSearch("")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition cursor-pointer"
            >
              <FaChevronLeft className="text-xs" />
              <span>Previous</span>
            </button>

            <span className="text-sm font-medium text-slate-600 px-3">
              Page <strong className="text-slate-900 font-bold">{page}</strong> of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition cursor-pointer"
            >
              <span>Next</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
