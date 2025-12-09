import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://rider-db:27017/riderdb");
    console.log("Rider MongoDB connected:");
  } catch (err) {
    console.error("Rider MongoDB connection failed:", err);
    process.exit(1);
  }
}
