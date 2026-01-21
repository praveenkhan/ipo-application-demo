import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getBookedSlots,
} from "../controllers/appointment.controller.js";
import auth from '../middleware/auth.middleware.js'


const router = express.Router();


router.post("/", auth, createAppointment); // patient


router.get("/my", auth, getMyAppointments); // patient
router.get("/slots/:doctorId/:date", getBookedSlots); // public

export default router;
