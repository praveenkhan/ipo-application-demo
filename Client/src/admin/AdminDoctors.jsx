import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { getDoctorImage } from "../data/doctorImages";
import {
  FaUserDoctor,
  FaMagnifyingGlass,
  FaTrashCan,
  FaChevronLeft,
  FaChevronRight,
  FaStethoscope,
  FaCircleCheck,
} from "react-icons/fa6";

export default function AdminDoctors() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // 🔐 Auth Guard
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch Doctors with Debounce
  useEffect(() => {
    const fetchDoctors = () => {
      setLoading(true);
      const encodedSearch = encodeURIComponent(search);
      fetch(
        `${API_BASE_URL}/api/admin/doctors?page=${page}&limit=6&search=${encodedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch doctors");
          return res.json();
        })
        .then((data) => {
          setDoctors(data.data || []);
          setTotalPages(data.totalPages || 1);
          setError("");
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    const timeoutId = setTimeout(fetchDoctors, 400);
    return () => clearTimeout(timeoutId);
  }, [page, search, token]);

  // Delete Doctor
  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor from the roster?"))
      return;

    await fetch(`${API_BASE_URL}/api/admin/doctors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setDoctors((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Doctor Directory
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Manage hospital practitioners, medical faculty, and departments
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-slate-400 text-xs pointer-events-none" />
          <input
            placeholder="Search doctor or specialty..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-500 shadow-xs transition"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* SKELETON */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl p-5 border border-slate-200 animate-pulse flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-36" />
                  <div className="h-3 bg-slate-100 rounded w-24" />
                </div>
              </div>
              <div className="h-8 bg-slate-100 rounded w-20" />
            </div>
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
          <FaUserDoctor className="text-3xl text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No Doctors Found</h3>
          <p className="text-slate-500 text-xs mt-1">
            No practitioners match your current search query.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
          {doctors.map((d) => (
            <div
              key={d._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:px-6 hover:bg-slate-50/80 transition gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getDoctorImage(d)}
                  alt={d.name}
                  className="w-12 h-12 rounded-2xl object-cover object-top border border-slate-200 flex-shrink-0 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base">
                      {d.name}
                    </h4>
                    <span className="text-emerald-500 text-xs" title="Verified">
                      <FaCircleCheck />
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full mt-1 border border-blue-100">
                    <FaStethoscope className="text-[10px]" />
                    {d.specialization}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={() => deleteDoctor(d._id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 px-3.5 py-2 rounded-xl transition cursor-pointer"
                >
                  <FaTrashCan className="text-xs" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
          >
            <FaChevronLeft className="text-[10px]" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-semibold text-slate-600 px-3">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
          >
            <span>Next</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      )}
    </div>
  );
}