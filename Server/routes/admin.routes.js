
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  getAllAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
} from "../controllers/admin.controller.js";

import {
  getDoctors,
  updateDoctorStatus,
  deleteDoctor,
} from "../controllers/doctor.controller.js";

const router = express.Router();

/* ================= APPOINTMENTS ================= */

router.get(
  "/appointments",
  authMiddleware,
  adminMiddleware,
  getAllAppointments,
);

router.patch(
  "/appointments/:id",
  authMiddleware,
  adminMiddleware,
  updateAppointmentStatus,
);

router.patch(
  "/appointments/:id/reschedule",
  authMiddleware,
  adminMiddleware,
  rescheduleAppointment,
);

/* ================= DOCTORS ================= */

router.get("/doctors", authMiddleware, adminMiddleware, getDoctors);

router.patch(
  "/doctors/:id",
  authMiddleware,
  adminMiddleware,
  updateDoctorStatus,
);

router.patch(
  "/doctors/:id/delete",
  authMiddleware,
  adminMiddleware,
  deleteDoctor,
);

export default router;
