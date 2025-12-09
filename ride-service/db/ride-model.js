import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // or mongoose.Schema.Types.ObjectId if you mirror use ids
      required: true,
    },
    captainId: {
      type: String,
    },
    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    dropoffLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    fare: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "ongoing", "completed", "cancelled"],
      default: "requested",
    },
    requestedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Ride", rideSchema);
