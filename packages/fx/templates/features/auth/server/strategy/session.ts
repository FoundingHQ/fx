import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import { COOKIE_SECRET, cookieOptions } from "../authConfig";

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: cookieOptions,
});
