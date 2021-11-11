import { NextApiRequest, NextApiResponse } from "next";
import nextSession from "next-session";
import { promisifyStore, expressSession } from "next-session/lib/compat";
import connectRedis from "connect-redis";
import { redis } from "@server/redis";
import { cookieOptions } from "@lib/auth/server/authConfig";

const RedisStore = connectRedis(expressSession);

const getSession = nextSession({
  store: promisifyStore(new RedisStore({ client: redis })),
  cookie: cookieOptions,
});

export default async function sessionMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  await getSession(req, res);
  next();
}
