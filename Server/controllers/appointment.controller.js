import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
// --------------------------------------------------
// Helper: Generate slots
// --------------------------------------------------
function generateSlots(start, end, duration) {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  while (h < eh || (h === eh && m < em)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += duration;

    if (m >= 60) {
      h++;
      m -= 60;
    }
  }

  return slots;
}

// --------------------------------------------------
// CREATE Appointment
// --------------------------------------------------
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, patientName: bodyName } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Doctor check
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    // Prevent double booking (Active slots only)
    const exists = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $in: ["pending", "confirmed"] }, // Only these block the slot
    });

    if (exists) {
      return res.status(400).json({ msg: "Slot already booked" });
    }

    // Resolve patient name
    let patientName = bodyName;

    if (req.userId) {
      const user = await User.findById(req.userId).select("name");
      if (user) patientName = user.name;
    }

    if (!patientName || patientName.trim().length < 3) {
      return res.status(400).json({ msg: "Patient name required" });
    }

    const appointment = await Appointment.create({
      patientName,
      userId: req.userId || null,
      doctorId,
      doctorName: doctor.name,
      date,
      time,
      status: "pending",
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// --------------------------------------------------
// My Appointments
// --------------------------------------------------
// --------------------------------------------------
// My Appointments
// --------------------------------------------------
export const getMyAppointments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const data = await Appointment.find({ userId: req.userId })
      .populate("doctorId", "name specialization")
      .sort({ date: -1, time: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments({ userId: req.userId });

    res.json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalAppointments: total,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// --------------------------------------------------
// Booked Slots
// --------------------------------------------------
export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    // Only fetch slots that are ACTUALLY taken
    const data = await Appointment.find({
      doctorId,
      date,
      status: { $in: ["pending", "confirmed"] },
    }).select("time");

    res.json(data.map((d) => d.time));
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// --------------------------------------------------
// Available Slots
// --------------------------------------------------
export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    // Find taken slots
    const appointments = await Appointment.find({
      doctorId,
      date,
      status: { $in: ["pending", "confirmed"] },
    });

    const booked = appointments.map((a) => a.time);

    const slots = generateSlots(
      doctor.startTime,
      doctor.endTime,
      doctor.slotDuration,
    );

    const available = slots.filter((s) => !booked.includes(s));

    res.json(available);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// --------------------------------------------------
// Complete Appointment (Admin / Doctor)
// --------------------------------------------------
export const completeAppointment = async (req, res) => {
  try {
    // 🛡️ Authorization Check
    if (req.role !== "admin" && req.role !== "doctor") {
      return res.status(403).json({ msg: "Not authorized to complete appointments" });
    }

    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true },
    );

    if (!appt) return res.status(404).json({ msg: "Appointment not found" });

    res.json({ msg: "Appointment completed", appt });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
