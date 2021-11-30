import { Generator, Context } from "@founding/devkit";

export type Props = {
  type: "session" | "jwt";
  scopes: ("local" | "google" | "facebook" | "magic")[];
};

export type AuthGenerator = Generator<Props>;
export type AuthContext = Context<Props>;

type F = (context: AuthContext) => boolean;

const hasFrameworkExpo: F = ({ config }) => config.frameworks.includes("expo");
const isTypeSession: F = ({ props }) => props.type === "session";
const isTypeJwt: F = ({ props }) => props.type === "jwt";
const hasScopeLocal: F = ({ props }) => props.scopes.includes("local");
const hasScopeGoogle: F = ({ props }) => props.scopes.includes("google");
const hasScopeFacebook: F = ({ props }) => props.scopes.includes("facebook");
const hasScopeMagic: F = ({ props }) => props.scopes.includes("magic");

export const dependencies = [
  // base set of required dependencies
  {
    list: [
      { name: "nodemailer" },
      { name: "passport" },
      { name: "bcrypt" },
      { name: "@types/bcrypt", isDevDep: true },
      { name: "@types/passport", isDevDep: true },
    ],
  },
  // type
  {
    filters: [isTypeSession],
    list: [
      { name: "next-session" },
      { name: "ioredis" },
      { name: "connect-redis" },
      { name: "@types/connect-redis", isDevDep: true },
    ],
  },
  {
    filters: [isTypeJwt],
    list: [
      { name: "passport-jwt" },
      { name: "jsonwebtoken" },
      { name: "@types/jsonwebtoken", isDevDep: true },
    ],
  },
  // scopes
  {
    filters: [hasScopeLocal],
    list: [
      { name: "passport-local" },
      { name: "@types/passport-local", isDevDep: true },
    ],
  },
  {
    filters: [hasScopeGoogle],
    list: [
      { name: "passport-google-oauth20" },
      { name: "@types/passport-google-oauth20", isDevDep: true },
    ],
  },
  {
    filters: [hasScopeFacebook],
    list: [],
  },
  {
    filters: [hasScopeMagic],
    list: [],
  },
];

export const templates = [
  {
    list: [
      {
        src: "templates/lib/auth/components",
        dest: "lib/auth/components",
      },
      {
        src: "templates/lib/auth/data",
        dest: "lib/auth/data",
      },
      {
        src: "templates/lib/auth/server/middlewares",
        dest: "lib/auth/server/middlewares",
      },
      {
        src: "templates/lib/auth/server/authConfig.ts",
        dest: "lib/auth/server/authConfig.ts",
      },
      {
        src: "templates/lib/auth/server/authService.ts",
        dest: "lib/auth/server/authService.ts",
      },
      {
        src: "templates/lib/users",
        dest: "lib/users",
      },
      {
        src: "templates/pages/api/auth",
        dest: "pages/api/auth",
      },
      {
        src: "templates/pages/auth",
        dest: "pages/auth",
      },
      {
        src: "templates/pages/protected",
        dest: "pages/protected",
      },
    ],
  },
  {
    filters: [hasFrameworkExpo],
    list: [
      {
        src: "templates/expo/screens",
        dest: "expo/screens",
      },
      {
        src: "templates/expo/components",
        dest: "lib/auth/expo",
      },
    ],
  },
  // type
  {
    filters: [isTypeSession],
    list: [
      {
        src: "templates/lib/auth/server/middlewares/session.ts",
        dest: "lib/auth/server/middlewares/session.ts",
      },
      {
        src: "templates/redis.ts",
        dest: "lib/core/server/redis.ts",
      },
    ],
  },
  {
    filters: [isTypeJwt],
    list: [
      {
        src: "templates/lib/auth/server/strategy/jwt.ts",
        dest: "lib/auth/server/strategy/jwt.ts",
      },
    ],
  },
  // scopes
  {
    filters: [hasScopeLocal],
    list: [
      {
        src: "templates/lib/auth/server/strategy/local.ts",
        dest: "lib/auth/server/strategy/local.ts",
      },
    ],
  },
  {
    filters: [hasScopeGoogle],
    list: [
      {
        src: "templates/lib/auth/server/strategy/google.ts",
        dest: "lib/auth/server/strategy/google.ts",
      },
    ],
  },
  {
    filters: [hasScopeFacebook],
    list: [],
  },
  {
    filters: [hasScopeMagic],
    list: [],
  },
];
