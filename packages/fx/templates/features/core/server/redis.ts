import { createClient, RedisClient } from "redis";

declare global {
  var redis: RedisClient | undefined;
}

export const redis =
  global.redis ||
  createClient({
    url: process.env.REDIS_URL,
  });

if (process.env.NODE_ENV !== "production") global.redis = redis;
