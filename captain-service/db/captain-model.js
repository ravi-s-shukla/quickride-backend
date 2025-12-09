import mongoose from "mongoose";

const captainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },

    vehicle: {
      model: { type: String, required: true },
      plateNumber: { type: String, required: true, unique: true },
    },

    status: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "offline",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Captain", captainSchema);
