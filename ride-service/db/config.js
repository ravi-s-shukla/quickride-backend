import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://ride-db:27017/ridedb");
    console.log("Ride MongoDB connected:");
  } catch (err) {
    console.error("Ride MongoDB connection failed:", err);
    process.exit(1);
  }
}