import { Server } from "socket.io";
import { socketAuth } from "./auth.js";
import { registerSocketEvents } from "./events.js";

const allowedOrigin = ['http://localhost:3000'];

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigin,
      credentials: true,
    }
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    registerSocketEvents(io, socket);
  });

  return io;
};
