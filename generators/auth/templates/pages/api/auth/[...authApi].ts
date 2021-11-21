import createHandler from "@server/handler";
import { passport } from "@lib/auth/server/middlewares/passport";
import { authRoutes } from "@lib/auth/server/authConfig";
<% if (props.type === "jwt") { %>
import {
  createAccessToken,
  createRefreshToken,
  attachRefreshToken,
  destroyRefreshToken,
} from "@lib/auth/server/authService";
<% } %>
const handler = createHandler({ attachParams: true });

handler
  .post(
    authRoutes.signup,
    passport.authenticate("signup", { session: true }),
    async (req, res) => {
      <% if (props.type === "jwt") { %>
      const accessToken = createAccessToken(req.user!);
      const refreshToken = createRefreshToken(req.user!);
      attachRefreshToken(refreshToken, refreshToken);
      res.status(200).json({ user: req.user, accessToken });
      <% } %>
      <% if (props.type === "session") { %>
      req.session.userId = req.user?.id;
      res.status(200).json({ user: req.user });
      <% } %>
    }
  )
  .post(
    authRoutes.login,
    passport.authenticate("login", { session: true }),
    async (req, res) => {
      <% if (props.type === "jwt") { %>
      const accessToken = createAccessToken(req.user!);
      const refreshToken = createRefreshToken(req.user!);
      attachRefreshToken(refreshToken, refreshToken);
      res.status(200).json({ user: req.user, accessToken });
      <% } %>
      <% if (props.type === "session") { %>
      req.session.userId = req.user?.id;
      res.status(200).json({ user: req.user });
      <% } %>
    }
  )
  .post(authRoutes.logout, async (req, res) => {
    req.logout();
    <% if (props.type === "jwt") { %>
    // destroyRefreshToken(res);
    // res.status(200).json({ user: null, accessToken: null });
    <% } %>
    <% if (props.type === "session") { %>
    res.status(200).json({ user: null });
    <% } %>
  })
  <% if (props.type === "jwt") { %>
  .post(
    authRoutes.refresh,
    passport.authenticate("refreshToken", { session: false }),
    async (req, res) => {
      const accessToken = createAccessToken(req.user!);
      res.status(200).json({ user: req.user, accessToken });
    }
  )
  <% } %>
  .post(authRoutes.currentUser, async (req, res) => {
    res.status(200).json({ user: req.user });
  })
  .get(
    authRoutes.google,
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: true,
    })
  )
  .get(
    authRoutes.googleCallback,
    passport.authenticate("google", {
      failureRedirect: "/auth/login",
      session: true,
    }),
    async (req, res) => {
      <% if (props.type === "jwt") { %>
      const refreshToken = createRefreshToken(req.user!);
      attachRefreshToken(refreshToken, refreshToken);
      <% } %>
      <% if (props.type === "session") { %>
      req.session.userId = req.user?.id;
      res.redirect("/");
      <% } %>
    }
  );

export default handler;