import Redis from "ioredis"; //io-redis is redis client library for node js (socket and redis)
import { env } from "./env.js";

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error", err);
});
