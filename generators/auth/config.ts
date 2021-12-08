import { Generator, Context, Filter, FilterableList } from "@founding/devkit";

export type Props = {
  type: "session" | "jwt";
  scopes: ("local" | "google" | "facebook" | "magic")[];
};

export type AuthGenerator = Generator<Props>;
export type AuthContext = Context<Props>;

const hasFrameworkExpo: Filter<AuthContext> = ({ config }) => {
  return config.frameworks.includes("expo");
};
const isTypeSession: Filter<AuthContext> = ({ props }) => {
  return props.type === "session";
};
const isTypeJwt: Filter<AuthContext> = ({ props }) => {
  return props.type === "jwt";
};
const hasScopeLocal: Filter<AuthContext> = ({ props }) => {
  return props.scopes.includes("local");
};
const hasScopeGoogle: Filter<AuthContext> = ({ props }) => {
  return props.scopes.includes("google");
};
const hasScopeFacebook: Filter<AuthContext> = ({ props }) => {
  return props.scopes.includes("facebook");
};
const hasScopeMagic: Filter<AuthContext> = ({ props }) => {
  return props.scopes.includes("magic");
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
        src: "templates/lib/auth/server/middlewares",
        dest: "lib/auth/server/middlewares",
      },
      {
        src: "templates/lib/auth/server/authConfig.ts.ejs",
        dest: "lib/auth/server/authConfig.ts",
      },
      {
        src: "templates/lib/auth/server/authService.ts.ejs",
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
        src: "templates/lib/auth/server/middlewares/session.ts.ejs",
        dest: "lib/auth/server/middlewares/session.ts",
      },
      {
        src: "templates/redis.ts.ejs",
        dest: "lib/core/server/redis.ts",
      },
    ],
  },
  {
    filters: [isTypeJwt],
    list: [
      {
        src: "templates/lib/auth/server/strategy/jwt.ts.ejs",
        dest: "lib/auth/server/strategy/jwt.ts",
      },
    ],
  },
  // scopes
  {
    filters: [hasScopeLocal],
    list: [
      {
        src: "templates/lib/auth/server/strategy/local.ts.ejs",
        dest: "lib/auth/server/strategy/local.ts",
      },
    ],
  },
  {
    filters: [hasScopeGoogle],
    list: [
      {
        src: "templates/lib/auth/server/strategy/google.ts.ejs",
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
