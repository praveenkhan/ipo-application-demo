import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import img1 from "../assets/img/bg-img/hero1.jpg";
import img2 from "../assets/img/blog-img/home3.jpg";
import img3 from "../assets/img/bg-img/hero3.jpg";

const API_URL = `${API_BASE_URL}/api/doctors`;

export default function Home() {
  const [specialties, setSpecialties] = useState([]);
  const [index, setIndex] = useState(0);

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
              description: doc.description || "Expert medical care",
            };
          }
        });

        setSpecialties(Object.values(unique));
      })
      .catch(() => setSpecialties([]));
  }, []);

  const slides = [
    { img: img1, title: "Hospital Appointment Booking", desc: "Book doctors instantly" },
    { img: img2, title: "Find Best Doctors", desc: "Specialists near you" },
    { img: img3, title: "Manage Your Visits", desc: "Track appointments easily" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>

      {/* HERO */}
      <section className="relative h-[80vh] mt-[120px] overflow-hidden">
        <div className="h-full relative">
          <img src={slides[index].img} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {slides[index].title}
              </h1>
              <p className="mb-6">{slides[index].desc}</p>

              <div className="flex justify-center gap-4">
                <Link to="/doctors" className="bg-blue-600 px-6 py-2 rounded">
                  Book Appointment
                </Link>
                <Link to="/my-appointments" className="border px-6 py-2 rounded">
                  My Appointments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <Stat num="12,000+" label="Patients Served" />
          <Stat num="150+" label="Doctors" />
          <Stat num="5,000+" label="Appointments" />
          <Stat num="20+" label="Specializations" />
        </div>
      </section>

      {/* SPECIALIZATION */}
      {specialties.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
            <div>
              <h1 className="text-3xl font-bold mb-4">
                Find Your Specialization
              </h1>

              <p className="mb-6">
                Choose from multiple medical specializations and instantly book
                appointments with experienced doctors.
              </p>

              <Link
                to="/specialization"
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Find Specialization
              </Link>
            </div>

            <img src={img2} className="w-full" />
          </div>
        </section>
      )}

      {/* ABOUT */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">About Our Hospital</h2>
        <p className="text-gray-600">
          Providing quality healthcare with experienced doctors and modern facilities.
        </p>
      </section>
    </div>
  );
}

function Stat({ num, label }) {
  return (
    <div>
      <h2 className="text-blue-600 text-3xl font-bold">{num}</h2>
      <p>{label}</p>
    </div>
  );
}