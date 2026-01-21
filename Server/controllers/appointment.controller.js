import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/user.js";

// CREATE appointment
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, patientName: bodyName } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    let patientName = bodyName;

    if (req.userId) {
      const user = await User.findById(req.userId).select("name");
      if (user) patientName = user.name;
      console.log("userId:", req.userId);
      console.log("body:", req.body);
    }

    if (!patientName || patientName.trim().length < 3) {
      return res.status(400).json({ msg: "Patient name is required" });
    }

    const appointment = await Appointment.create({
      patientName,
      userId: req.userId,
      doctorId,
      doctorName: doctor.name,
      date,
      time,
      // status defaults to Pending
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};




export const getMyAppointments = async (req, res) => {
  const data = await Appointment.find({ userId: req.user.id });
  res.json(data);
};

export const getBookedSlots = async (req, res) => {
  const { doctorId, date } = req.params;
  // appointments store the doctor id in `doctorId` field
  const data = await Appointment.find({ doctorId, date }).select("time");
  res.json(data);
};
