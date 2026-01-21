import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: {
      type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 🚫 PREVENT DOUBLE BOOKING (CRITICAL)
appointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model("Appointment", appointmentSchema);
