import Doctor from "../models/Doctor.js";

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get doctors by specialization
export const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Specialization is required" });
    }

    const doctors = await Doctor.find({
      specialization: name,
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET DOCTOR BY ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: "Invalid doctor ID" });
  }
};

export const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const updateDoctorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const doctor = await Doctor.findById(id);
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  doctor.status = status;
  await doctor.save();

  res.json(doctor);
};


export const deletedoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.isDeleted = true;
    await doctor.save();

    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

