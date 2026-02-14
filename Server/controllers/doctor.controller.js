import Doctor from "../models/Doctor.js";

// Get all doctors with pagination
export const getDoctors = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const safeSearch = escapeRegex(search);

    const skip = (page - 1) * limit;

    const query = {
      isDeleted: { $ne: true },
      $or: [
        { name: { $regex: safeSearch, $options: "i" } },
        { specialization: { $regex: safeSearch, $options: "i" } },
      ],
    };

    const doctors = await Doctor.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(query);

    res.json({
      data: doctors,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalDoctors: total,
    });

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
      isDeleted: { $ne: true },
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

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.isDeleted = true;
    await doctor.save();

    res.status(200).json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
