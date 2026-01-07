import { redis } from "../config/redis.js";

/**
 * Keys structure:
 * rider:{userId}   → socketId
 * captain:{userId} → socketId
 */

export const saveSocketId = async (role, userId, socketId) => {
  console.log(`reddis getting socket ${JSON.parse(redis.get(`${role}:${userId}`))}`);
  await redis.set(`${role}:${userId}`, socketId);
};

export const getSocketId = async (role, userId) => {
  return redis.get(`${role}:${userId}`);
};

export const removeSocketId = async (role, userId) => {
  await redis.del(`${role}:${userId}`);
};
