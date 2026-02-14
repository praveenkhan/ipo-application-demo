import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

const DOCTOR_API = `${API_BASE_URL}/api/doctors`;

export default function DoctorProfile() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`${DOCTOR_API}/${id}`)
      .then((r) => r.json())
      .then(setDoctor);
  }, [id]);

  if (!doctor)
    return <p className="pt-[140px] text-center">Loading profile…</p>;

  return (
    <div className="pt-[140px] pb-20 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold mb-6">
            {doctor.name?.charAt(0)}
          </div>

          <h2 className="text-3xl font-bold mb-2">{doctor.name}</h2>
          <p className="text-blue-600 text-lg mb-4">{doctor.specialization}</p>

          <div className="flex gap-6 mb-8 text-gray-600">
            {doctor.experience && (
              <p>
                <strong>Experience:</strong> {doctor.experience} years
              </p>
            )}
            {doctor.rating && (
              <p>
                <strong>Rating:</strong> ⭐ {doctor.rating}
              </p>
            )}
          </div>

          {doctor.description && (
            <p className="max-w-2xl text-gray-500 leading-relaxed mb-8">
              {doctor.description}
            </p>
          )}

          <Link
            to={`/book?doctorId=${doctor._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            Book Appointment Now
          </Link>
        </div>
      </div>
    </div>
  );
}
