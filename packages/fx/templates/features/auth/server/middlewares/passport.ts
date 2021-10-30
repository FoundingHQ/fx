import passport from "passport";
import { signupStrategy, loginStrategy } from "@lib/auth/server/strategy/local";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "@lib/auth/server/strategy/jwt";
import { googleStrategy } from "@lib/auth/server/strategy/google";

export const configurePassport = () => {
  passport.use("signup", signupStrategy);
  passport.use("login", loginStrategy);
  passport.use("accessToken", accessTokenStrategy);
  passport.use("refreshToken", refreshTokenStrategy);
  passport.use(googleStrategy);

  return passport;
};
