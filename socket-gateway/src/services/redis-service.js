import { redis } from "../config/redis.js";

/**
 * Keys structure:
 * rider:{userId}   → socketId
 * captain:{userId} → socketId
 */

export const saveSocketId = async (role, userId, socketId) => {
  await redis.set(`${role}:${userId}`, socketId);
  if (role === "captain") {
    await redis.sadd("captains:online", userId);
  }
};

export const getSocketId = async (role, userId) => {
  return redis.get(`${role}:${userId}`);
};

export const notifyAllCaptains = async (io, rideData) => {
  const captainIds = await redis.smembers("captains:online");

  for (const captainId of captainIds) {
    const socketId = await redis.get(`captain:${captainId}`);
    if (socketId) {
      io.to(socketId).emit("ride:new", rideData);
    }
  }
};

export const removeSocketId = async (role, userId) => {
  await redis.del(`${role}:${userId}`);
  if (role === "captain") {
    await redis.srem("captains:online", userId);
  }
};
