import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

/* ---------------- GET ALL APPOINTMENTS ---------------- */

export const getAllAppointments = async (req, res) => {
  try {
    const { date, doctor, status, search, page = 1, limit = 6 } = req.query;

    let query = {};

    if (status) query.status = status; // pending | confirmed | cancelled

    if (doctor) query.doctorName = doctor;

    if (date) {
      // `Appointment.date` is stored as a string in YYYY-MM-DD format.
      // Match the exact date string instead of comparing Date objects.
      query.date = date;
    }

    let appointments = await Appointment.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    // 🔍 Search patient name AFTER populate
    if (search) {
      appointments = appointments.filter((a) =>
        a.userId?.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const totalAppointments = appointments.length;
    const totalPages = Math.ceil(totalAppointments / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedAppointments = appointments.slice(startIndex, startIndex + limitNum);

    res.json({
      data: paginatedAppointments,
      totalAppointments,
      totalPages,
      currentPage: pageNum,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- UPDATE APPOINTMENT STATUS ---------------- */

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // only allow lowercase values
  if (!["confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // lock once processed
    if (appointment.status !== "pending") {
      return res.status(400).json({ message: "Action not allowed" });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/// GET DOCTORS FOR FILTER
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update and delete date and time//

export const rescheduleAppointment = async (req, res) => {
  const { date, time } = req.body;

  const appt = await Appointment.findById(req.params.id);

  if (!appt) return res.status(404).json({ msg: "Appointment not found" });

  appt.date = date;
  appt.time = time;
  appt.status = "confirmed";

  await appt.save();

  res.json(appt);
};


