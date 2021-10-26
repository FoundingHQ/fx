import { parse, serialize, CookieSerializeOptions } from "cookie";

export type { CookieSerializeOptions };

export const parseCookies = (req: any) => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

export const serializeCookie = (
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  return serialize(name, stringValue, options);
};

export const cookieMiddleware = (_req: any, res: any, next: any) => {
  res.cookie = (
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
  ) => {
    res.setHeader("Set-Cookie", serializeCookie(name, value, options));
  };
  next();
};
