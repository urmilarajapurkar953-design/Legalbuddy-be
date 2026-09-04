import { Redis } from "ioredis";
import logger from "../../common/logger";

export const redisConnection = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,

});

redisConnection.on("connect", () => {
  logger.info("Redis connected successfully");
});

redisConnection.on("error", (error) => {
  logger.error({ error }, "Redis connection error");
});