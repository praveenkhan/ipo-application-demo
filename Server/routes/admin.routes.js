
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
} from "../controllers/admin.controller.js";

const router = express.Router();

/* ADMIN DASHBOARD */
router.get(
  "/appointments",
  authMiddleware,
  adminMiddleware,
  getAllAppointments
);

/* UPDATE STATUS */

router.post("/doctors", authMiddleware, adminMiddleware, addDoctor);
router.patch(
  "/appointments/:id",
  authMiddleware,
  adminMiddleware,
  updateAppointmentStatus
);

router.get(
  "/doctors",
  authMiddleware,
  adminMiddleware,
  getDoctors,
  getDoctorsBySpecialization,
  getDoctorById
);

router.patch(
  "/doctors/:id",
  authMiddleware,
  adminMiddleware,
  updateDoctorStatus,
  addDoctor
);
export default router;
