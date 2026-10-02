import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import API_BASE_URL from "../config/api";
import doctorImg from "../assets/img/bg-img/hero2.png";
import { getSpecializationImage } from "../data/specializationImages";
import {
  FaMagnifyingGlass,
  FaXmark,
  FaStethoscope,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaUserDoctor,
} from "react-icons/fa6";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Specialization() {
  const [search, setSearch] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${API_URL}?limit=100`)
      .then((res) => res.json())
      .then((result) => {
        const doctors = result.data || result || [];

        const unique = {};

        doctors.forEach((doc) => {
          if (doc.specialization && !unique[doc.specialization]) {
            unique[doc.specialization] = {
              name: doc.specialization,
              description:
                doc.description ||
                "Specialized diagnostic evaluation and evidence-based clinical treatment.",
            };
          }
        });

        setSpecialties(Object.values(unique));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return specialties.filter(
      (s) =>
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

  return (
    <div className="bg-slate-50 min-h-screen pt-[130px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HERO BANNER */}
        <section className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white overflow-hidden p-8 sm:p-14 mb-16 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-5 border border-blue-400/20">
                <FaStethoscope className="text-xs" />
                <span>{specialties.length || 20}+ Clinical Departments</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                Explore Clinical <br />Specializations
              </h1>

              <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">
                Browse our world-class medical departments to discover top physicians and surgeons specializing in your exact healthcare needs.
              </p>

              {filtered[0] && (
                <Link
                  to={`/doctors?specialization=${encodeURIComponent(
                    filtered[0].name
                  )}`}
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5"
                >
                  <FaUserDoctor className="text-sm" />
                  <span>View Doctors in {filtered[0].name}</span>
                </Link>
              )}
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl" />
                <img
                  src={doctorImg}
                  alt="Medical specialists"
                  className="relative z-10 max-h-[340px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER SECTION */}
        <div className="mb-12">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Find Your Medical Department
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Search by condition, specialty name, or clinical treatment
            </p>

            <div className="relative flex items-center">
              <FaMagnifyingGlass className="absolute left-4 text-slate-400 text-base pointer-events-none" />
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-10 py-3.5 text-slate-800 text-sm placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                placeholder="Search cardiology, pediatrics, neurology..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition"
                  title="Clear search"
                >
                  <FaXmark className="text-base" />
                </button>
              )}
            </div>

            {search && (
              <p className="text-xs text-slate-500 mt-3 text-left pl-2">
                Showing results for <span className="font-semibold text-blue-600">"{search}"</span> ({filtered.length} found)
              </p>
            )}
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse space-y-4"
              >
                <div className="h-44 bg-slate-100 rounded-2xl" />
                <div className="h-6 bg-slate-100 rounded-md w-3/4" />
                <div className="h-4 bg-slate-100 rounded-md w-full" />
                <div className="h-10 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* SPECIALTIES GRID */}
        {!loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-12">
            {paginatedSpecialties.map((s) => {
              const specVisual = getSpecializationImage(s.name);

              return (
                <div
                  key={s.name}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 p-5 flex flex-col group"
                >
                  {/* Image Container with Visual Representation */}
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-5 bg-slate-100 shadow-xs">
                    <img
                      src={specVisual}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={s.name}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
                    
                    <span className="absolute bottom-3 left-3 text-[11px] font-bold tracking-wider text-white uppercase bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                      Department
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {s.name}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {s.description}
                  </p>

                  <Link
                    to={`/specialization/${encodeURIComponent(s.name)}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold py-3 rounded-xl border border-blue-100 hover:border-blue-600 shadow-xs hover:shadow-md transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                  >
                    <span>View Doctors in {s.name}</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}

            {!paginatedSpecialties.length && (
              <div className="col-span-full bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <FaStethoscope className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  No Specializations Found
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  We couldn't find any department matching "{search}".
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-6 pb-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
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