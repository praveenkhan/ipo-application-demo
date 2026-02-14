import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getBookedSlots,
  getAvailableSlots,
  completeAppointment,
} from "../controllers/appointment.controller.js";
import auth from '../middleware/auth.middleware.js'


const router = express.Router();


router.post("/", auth, createAppointment); // patient


router.get("/my", auth, getMyAppointments); // patient
router.get("/slots/:doctorId/:date", getBookedSlots); // public
router.put("/complete/:id", auth, completeAppointment); // Protected
router.get("/available/:doctorId/:date", getAvailableSlots); // Public

export default router;
