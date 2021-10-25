import passport from "passport";

export const authRequireMiddleware = (req: any, res: any, next: any) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
          data: info,
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
