import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("DEBUG_MONGO_URI =", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
