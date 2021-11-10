import { hash, compare } from "bcrypt";
<% if (type === "jwt") { %>
import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIMEOUT,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_SECRET,
  cookieOptions,
} from "./authConfig";
<% } %>
const SALT_ROUNDS = 10;

export const createPasswordHash = async (password: string) => {
  const passwordHash = await hash(password, SALT_ROUNDS);
  return passwordHash;
};

export const validatePassword = async (
  password: string,
  passwordHash: string
) => {
  const isMatchingPassword = await compare(password, passwordHash);
  return isMatchingPassword;
};

<% if (type === "jwt") { %>
export const createAccessToken = (user: Partial<User>) => {
  const accessToken = sign({ user }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TIMEOUT,
  });
  return accessToken;
};

export const createRefreshToken = (user: Partial<User>) => {
  const refreshToken = sign({ user }, REFRESH_TOKEN_SECRET, {
    expiresIn: "90d",
  });
  // Save refresh token to db
  return refreshToken;
};

export const attachRefreshToken = (refreshToken: string, res: any) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);
};

export const destroyRefreshToken = (res: any) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, "", cookieOptions);
};
<% } %>
