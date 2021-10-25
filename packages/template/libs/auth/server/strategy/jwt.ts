import { Strategy, ExtractJwt } from "passport-jwt";
import {
  createUser,
  getUserPasswordHash,
} from "@libs/users/server/userService";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_SECRET,
} from "../authConfig";

export const accessTokenStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET,
  },
  (payload, done) => {
    if (!payload) return done(null, false);
    return done(null, payload.user);
  }
);

export const refreshTokenStrategy = new Strategy(
  {
    jwtFromRequest: (req) => req.cookies[REFRESH_TOKEN_COOKIE_NAME],
    secretOrKey: REFRESH_TOKEN_SECRET,
  },
  (payload, done) => {
    if (!payload) return done(null, false);
    // TODO: get user from db
    return done(null, payload.user);
  }
);
