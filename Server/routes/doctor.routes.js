import express from "express";
import {
  getDoctors,
  getDoctorsBySpecialization,
  getDoctorById,
} from "../controllers/doctor.controller.js";

const router = express.Router();

// GET all confirmed doctors (Public)
router.get("/", getDoctors);

// GET doctor by ID (Public)
router.get("/:id", getDoctorById);

// GET doctors by specialization (Public)
router.get("/specialization", getDoctorsBySpecialization);

export default router;
