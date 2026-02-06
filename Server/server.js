import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectDB from "./config/db.js";


const app = express();

// Allow CORS from the frontend during development. Use a specific origin in production.


app.use(
  cors({
    origin: "https://ipo-application-demo.vercel.app",
    credentials: true,
  }),
);


app.use(express.json());
connectDB();

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("Hospital Booking API is running 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
