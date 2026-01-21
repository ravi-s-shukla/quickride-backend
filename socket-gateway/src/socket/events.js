import {
    saveSocketId,
    removeSocketId,
    getSocketId
  } from "../services/redis-service.js";
  
  export const registerSocketEvents = (io, socket) => {
    const { role, id } = socket.user;
    
    // Save socketId in Redis
    saveSocketId(role, id, socket.id);

    socket.on("disconnect", () => {
      console.log(`❌ ${role} disconnected → ${id}`);
      removeSocketId(role, id);
    });
  };
  