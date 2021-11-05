import { createHandler, passport } from "@server/handler";
import {
  createAccessToken,
  createRefreshToken,
  attachRefreshToken,
  destroyRefreshToken,
} from "@lib/auth/server/authService";
import { authRoutes } from "@lib/auth/server/authConfig";

const handler = createHandler({ attachParams: true });

handler
  .post(
    authRoutes.signup,
    passport.authenticate("signup", { session: false }),
    async (req, res) => {
      const accessToken = createAccessToken(req.user!);
      const refreshToken = createRefreshToken(req.user!);

      attachRefreshToken(refreshToken, refreshToken);
      res.status(200).json({ user: req.user, accessToken });
    }
  )
  .post(
    authRoutes.login,
    passport.authenticate("login", { session: false }),
    async (req, res) => {
      const accessToken = createAccessToken(req.user!);
      const refreshToken = createRefreshToken(req.user!);

      attachRefreshToken(refreshToken, refreshToken);
      res.status(200).json({ user: req.user, accessToken });
    }
  )
  .post(
    authRoutes.refresh,
    passport.authenticate("refreshToken", { session: false }),
    async (req, res) => {
      const accessToken = createAccessToken(req.user!);
      res.status(200).json({ user: req.user, accessToken });
    }
  )
  .post(
    authRoutes.logout,
    passport.authenticate("refreshToken", { session: false }),
    async (req, res) => {
      destroyRefreshToken(res);
      req.logout();
      res.status(200).json({ user: null, accessToken: null });
    }
  )
  .get(
    authRoutes.google,
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  )
  .get(
    authRoutes.googleCallback,
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    async (req, res) => {
      const refreshToken = createRefreshToken(req.user!);

      attachRefreshToken(refreshToken, refreshToken);
      res.redirect("/");
    }
  );

export default handler;
