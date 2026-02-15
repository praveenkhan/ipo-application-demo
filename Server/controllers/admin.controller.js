import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

/* ---------------- GET ALL APPOINTMENTS ---------------- */

export const getAllAppointments = async (req, res) => {
  try {
    const { date, doctor, status, search, page = 1, limit = 6 } = req.query;

    let query = {};

    if (status) query.status = status;
    if (doctor) query.doctorName = doctor;
    if (date) query.date = date;

    let appointments = await Appointment.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    if (search) {
      appointments = appointments.filter(a =>
        a.userId?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const totalAppointments = appointments.length;
    const totalPages = Math.ceil(totalAppointments / limitNum);

    const start = (pageNum - 1) * limitNum;
    const data = appointments.slice(start, start + limitNum);

    res.json({
      data,
      totalAppointments,
      totalPages,
      currentPage: pageNum,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- UPDATE STATUS ---------------- */

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.status !== "pending")
      return res.status(400).json({ message: "Already processed" });

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- RESCHEDULE ---------------- */

export const rescheduleAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time)
      return res.status(400).json({ message: "Date & Time required" });

    const appt = await Appointment.findById(req.params.id);

    if (!appt)
      return res.status(404).json({ message: "Appointment not found" });

    appt.date = date;
    appt.time = time;
    appt.status = "confirmed";

    await appt.save();

    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- GET DOCTORS ---------------- */

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};