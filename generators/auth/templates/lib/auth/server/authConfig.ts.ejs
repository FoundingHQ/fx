export const ACCESS_TOKEN_TIMEOUT = 60000 * 5; // 5 mins
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "a-secret";

export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "r-secret";

export const COOKIE_SECRET = process.env.COOKIE_SECRET || "c-secret";

export const cookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as "lax",
  maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days (last number is in days)
  secure: process.env.NODE_ENV !== "development" && !process.env.INSECURE_AUTH,
  signed: process.env.NODE_ENV !== "development" && !process.env.INSECURE_AUTH,
};

export const authRoutes = {
  signup: "/api/auth/signup",
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  google: "/api/auth/google",
  googleCallback: "/api/auth/google/callback",
  facebook: "/api/auth/facebook",
  facebookCallback: "/api/auth/facebook/callback",
  refresh: "/api/auth/refresh_token",
  currentUser: "/api/auth/current_user",
};

type AuthRoutes = typeof authRoutes;

export const clientAuthRoutes = Object.keys(authRoutes).reduce((map, key) => {
  map[key as keyof AuthRoutes] = authRoutes[key as keyof AuthRoutes].replace(
    "/api",
    ""
  );
  return map;
}, {} as AuthRoutes);
