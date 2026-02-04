import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  getDoctors,
  getDoctorsBySpecialization,
  getDoctorById,
  addDoctor,
  updateDoctorStatus,
} from "../controllers/doctor.controller.js";

import {
  getAllAppointments,
  updateAppointmentStatus,
  updatetime,
  deletedoctor,
} from "../controllers/admin.controller.js";

const router = express.Router();

/* ADMIN DASHBOARD */
router.get(
  "/appointments",
  authMiddleware,
  adminMiddleware,
  getAllAppointments,
);

/* DOCTORS */
router.post("/doctors", authMiddleware, adminMiddleware, addDoctor);
router.get("/doctors", authMiddleware, adminMiddleware, getDoctors);
router.get(
  "/doctors/specialization",
  authMiddleware,
  adminMiddleware,
  getDoctorsBySpecialization,
);
router.get("/doctors/:id", authMiddleware, adminMiddleware, getDoctorById);
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
  deletedoctor,
);

/* APPOINTMENTS */
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
  updatetime,
);
export default router;
