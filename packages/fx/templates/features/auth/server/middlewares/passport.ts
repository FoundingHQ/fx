import passport from "passport";
<% if (type === "jwt") { %>
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "@lib/auth/server/strategy/jwt";
<% } %>
<% if (scopes.includes("local")) { %>
import { signupStrategy, loginStrategy } from "@lib/auth/server/strategy/local";
<% } %>
<% if (scopes.includes("google")) { %>
import { googleStrategy } from "@lib/auth/server/strategy/google";
<% } %>

export const configurePassport = () => {
  <% if (type === "jwt") { %>
  passport.use("accessToken", accessTokenStrategy);
  passport.use("refreshToken", refreshTokenStrategy);
  <% } %>
  <% if (scopes.includes("local")) { %>
  passport.use("signup", signupStrategy);
  passport.use("login", loginStrategy);
  <% } %>
  <% if (scopes.includes("google")) { %>
  passport.use(googleStrategy);
  <% } %>
  return passport;
};
