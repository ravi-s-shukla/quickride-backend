import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const socketAuth = (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Authentication token missing"));
    }

    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    const role = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("role="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const payload = jwt.verify(token, env.JWT_SECRET);
    socket.user = payload;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};
