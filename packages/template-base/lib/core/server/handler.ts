import { NextApiRequest, NextApiResponse } from "next";
import { error } from "next/dist/build/output/log";
import nc from "next-connect";
import { trustProxyMiddleware } from "@lib/core/server/middlewares/trustProxy";
import {
  cookieMiddleware,
  CookieSerializeOptions,
} from "@lib/core/server/middlewares/cookie";
import { configurePassport } from "@lib/auth/server/middlewares/passport";

export type AppRequest = NextApiRequest & Express.Request;

export type AppResponse = NextApiResponse &
  Express.Response & {
    cookie(
      name: string,
      value: unknown,
      options?: CookieSerializeOptions
    ): void;
  };

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export const passport = configurePassport();

export const createHandler = (options = {}) =>
  nc<AppRequest, AppResponse>({
    onError: (err, _, res) => {
      error(err);
      res.status(500).end(err.toString());
    },
    onNoMatch: (_, res) => {
      res.status(404).end("Page is not found");
    },
    ...options,
  })
    .use(process.env.VERCEL ? trustProxyMiddleware : (_, __, next) => next())
    .use(cookieMiddleware)
    .use(passport.initialize());
