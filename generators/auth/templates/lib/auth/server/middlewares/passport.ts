import passport from "passport";
// import { googleStrategy } from "@lib/auth/server/strategy/google";
import { signupStrategy, loginStrategy } from "@lib/auth/server/strategy/local";
import { serializeUser, deserializeUser } from "@lib/users/server/userService";

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);

// passport.use(googleStrategy);

export { passport };
