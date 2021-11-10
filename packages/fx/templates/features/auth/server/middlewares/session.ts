import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "@server/redis";
import { COOKIE_SECRET, cookieOptions } from "@lib/auth/server/authConfig";

const RedisStore = connectRedis(session);

const sessionMiddleware = session({
  store: new RedisStore({ client: redis }),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: cookieOptions,
});

export default sessionMiddleware;
