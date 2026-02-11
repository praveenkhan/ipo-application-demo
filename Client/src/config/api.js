const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://hospital-booking-backend-gmmu.onrender.com";

export default API_BASE_URL;
