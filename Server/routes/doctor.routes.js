import express from "express";
import {
  getDoctors,
  getDoctorsBySpecialization,
  getDoctorById,
} from "../controllers/doctor.controller.js";

const router = express.Router();

// GET all confirmed doctors
// GET /api/doctors
router.get("/", getDoctors);
///get by idd//
router.get("/:id", getDoctorById);
// GET doctors by specialization
// GET /api/doctors/specialization?name=Cardiologist
router.get("/specialization", getDoctorsBySpecialization);

export default router;
