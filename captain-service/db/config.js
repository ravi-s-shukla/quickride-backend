import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://captain-db:27017/captaindb");
    console.log("Captain MongoDB connected:");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}
