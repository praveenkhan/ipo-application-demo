import Appointment from "../models/Appointment.js";


/* ---------------- GET ALL APPOINTMENTS ---------------- */

export const getAllAppointments = async (req, res) => {
  try {
    const { date, doctor, status, search } = req.query;

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
        a.userId?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(appointments);
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
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.json(doctors);
};
