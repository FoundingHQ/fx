import passport from "passport";

export const authAssignMiddleware = (req: any, res: any, next: any) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err) return next(err);
    req.user = user || false;
    next();
  })(req, res, next);
};
