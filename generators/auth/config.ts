import { Generator, Context, Filter, FilterableList } from "@founding/devkit";

export type Props = {
  type: "session" | "jwt";
  scopes: ("local" | "google" | "facebook" | "magic")[];
  sessionStore?: "redis" | "prisma";
};

export type AuthGenerator = Generator<Props>;
export type AuthContext = Context<Props>;

export const filters: Record<string, Filter<AuthContext>> = {
  hasFrameworkExpo({ config }) {
    return config.frameworks.includes("expo");
  },
  isTypeSession({ props }) {
    return props.type === "session";
  },
  isSessionStoreRedis({ props }) {
    return props.sessionStore === "redis";
  },
  isSessionStorePrisma({ props }) {
    return props.sessionStore === "prisma";
  },
  isTypeJwt({ props }) {
    return props.type === "jwt";
  },
  hasScopeLocal({ props }) {
    return props.scopes.includes("local");
  },
  hasScopeGoogle({ props }) {
    return props.scopes.includes("google");
  },
  hasScopeFacebook({ props }) {
    return props.scopes.includes("facebook");
  },
  hasScopeMagic({ props }) {
    return props.scopes.includes("magic");
  },
};

export const dependencies: FilterableList<AuthContext> = [
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
    filters: [filters.isTypeSession],
    list: [{ name: "next-session" }],
  },
  {
    filters: [filters.isTypeSession, filters.isSessionStorePrisma],
    list: [{ name: "@quixo3/prisma-session-store" }],
  },
  {
    filters: [filters.isTypeSession, filters.isSessionStoreRedis],
    list: [
      { name: "ioredis" },
      { name: "connect-redis" },
      { name: "@types/connect-redis", isDevDep: true },
    ],
  },
  {
    filters: [filters.isTypeJwt],
    list: [
      { name: "passport-jwt" },
      { name: "jsonwebtoken" },
      { name: "@types/jsonwebtoken", isDevDep: true },
    ],
  },
  // scopes
  {
    filters: [filters.hasScopeLocal],
    list: [
      { name: "passport-local" },
      { name: "@types/passport-local", isDevDep: true },
    ],
  },
  {
    filters: [filters.hasScopeGoogle],
    list: [
      { name: "passport-google-oauth20" },
      { name: "@types/passport-google-oauth20", isDevDep: true },
    ],
  },
  {
    filters: [filters.hasScopeFacebook],
    list: [],
  },
  {
    filters: [filters.hasScopeMagic],
    list: [],
  },
];

export const templates: FilterableList<AuthContext> = [
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
        src: "templates/lib/auth/api/middlewares",
        dest: "lib/auth/api/middlewares",
      },
      {
        src: "templates/lib/auth/api/authConfig.ts.ejs",
        dest: "lib/auth/api/authConfig.ts",
      },
      {
        src: "templates/lib/auth/api/authService.ts.ejs",
        dest: "lib/auth/api/authService.ts",
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
    filters: [filters.hasFrameworkExpo],
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
    filters: [filters.isTypeSession],
    list: [
      {
        src: "templates/lib/auth/api/middlewares/session.ts.ejs",
        dest: "lib/auth/api/middlewares/session.ts",
      },
    ],
  },
  {
    filters: [filters.isTypeSession, filters.isSessionStoreRedis],
    list: [
      {
        src: "templates/redis.ts.ejs",
        dest: "lib/core/api/redis.ts",
      },
    ],
  },
  {
    filters: [filters.isTypeJwt],
    list: [
      {
        src: "templates/lib/auth/api/strategy/jwt.ts.ejs",
        dest: "lib/auth/api/strategy/jwt.ts",
      },
    ],
  },
  // scopes
  {
    filters: [filters.hasScopeLocal],
    list: [
      {
        src: "templates/lib/auth/api/strategy/local.ts.ejs",
        dest: "lib/auth/api/strategy/local.ts",
      },
    ],
  },
  {
    filters: [filters.hasScopeGoogle],
    list: [
      {
        src: "templates/lib/auth/api/strategy/google.ts.ejs",
        dest: "lib/auth/api/strategy/google.ts",
      },
    ],
  },
  {
    filters: [filters.hasScopeFacebook],
    list: [],
  },
  {
    filters: [filters.hasScopeMagic],
    list: [],
  },
];
