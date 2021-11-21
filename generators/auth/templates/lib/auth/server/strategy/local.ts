import { Strategy } from "passport-local";
import { createUser, getUserPasswordHash } from "@lib/users/server/userService";
import { validatePassword } from "@lib/auth/server/authService";

export const signupStrategy = new Strategy(
  { usernameField: "email", passReqToCallback: true },
  async (_req, email, password, done) => {
    try {
      const user = await createUser({ email, password });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

export const loginStrategy = new Strategy(
  { usernameField: "email", passReqToCallback: true },
  async (_req, email, password, done) => {
    try {
      const { user, passwordHash } = await getUserPasswordHash({ email });
      if (
        !user ||
        !passwordHash ||
        (passwordHash && !(await validatePassword(password, passwordHash)))
      ) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);