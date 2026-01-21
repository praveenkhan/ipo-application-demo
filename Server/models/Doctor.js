import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    description: { type: String },
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true }, // "13:00"
    slotDuration: { type: Number, default: 30 }, // minutes
    image: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "unavailable"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
