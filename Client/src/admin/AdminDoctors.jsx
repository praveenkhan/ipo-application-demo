import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

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
    }, []);

    // Fetch Doctors with Debounce
    useEffect(() => {
        const fetchDoctors = () => {
            setLoading(true);
            const encodedSearch = encodeURIComponent(search);
            fetch(
                `${API_BASE_URL}/api/admin/doctors?page=${page}&limit=5&search=${encodedSearch}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch doctors");
                    return res.json();
                })
                .then(data => {
                    setDoctors(data.data || []);
                    setTotalPages(data.totalPages || 1);
                    setError("");
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        };

        const timeoutId = setTimeout(fetchDoctors, 500); // 500ms debounce
        return () => clearTimeout(timeoutId);
    }, [page, search, token]);

    // Delete Doctor
    const deleteDoctor = async (id) => {
        if (!window.confirm("Delete this doctor?")) return;

        await fetch(`${API_BASE_URL}/api/admin/doctors/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        setDoctors(prev => prev.filter(d => d._id !== id));
    };

    return (
        <div className="p-6">

            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Doctors</h2>

                <input
                    placeholder="Search doctor..."
                    value={search}
                    onChange={e => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    className="border px-3 py-2 rounded"
                />
            </div>

            {loading && <p>Loading...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && doctors.length === 0 && (
                <p>No doctors found.</p>
            )}

            {!loading && doctors.length > 0 && (
                <div className="bg-white shadow rounded">

                    {doctors.map(d => (
                        <div
                            key={d._id}
                            className="flex justify-between items-center px-6 py-4 border-b"
                        >
                            <div>
                                <p className="font-semibold">{d.name}</p>
                                <p className="text-sm text-gray-500">
                                    {d.specialization}
                                </p>
                            </div>

                            <button
                                onClick={() => deleteDoctor(d._id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                </div>
            )}

            {/* Pagination */}

            <div className="flex justify-between mt-6">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="border px-4 py-2 rounded disabled:opacity-40"
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="border px-4 py-2 rounded disabled:opacity-40"
                >
                    Next
                </button>

            </div>

        </div>
    );
}