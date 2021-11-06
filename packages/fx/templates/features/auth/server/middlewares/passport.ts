import passport from "passport";

/* @@template: type is jwt
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "@lib/auth/server/strategy/jwt";
*/

/* @@template: scopes includes local
import { signupStrategy, loginStrategy } from "@lib/auth/server/strategy/local";
*/

/* @@template: scopes includes google
import { googleStrategy } from "@lib/auth/server/strategy/google";
*/

export const configurePassport = () => {
  /* @@template: type is jwt
  passport.use("accessToken", accessTokenStrategy);
  passport.use("refreshToken", refreshTokenStrategy);
  */

  /* @@template: scopes includes local
  passport.use("signup", signupStrategy);
  passport.use("login", loginStrategy);
  */

  /* @@template: scopes includes google
  passport.use(googleStrategy);
  */

  return passport;
};
