import {
  Generator,
  Context,
  Filter,
  filterDependencies,
} from "@founding/devkit";

export type Props = {
  type: "session" | "jwt";
  scopes: ("local" | "google" | "facebook" | "magic")[];
  sessionStore?: "redis" | "prisma";
};

export type AuthGenerator = Generator<Props>;
export type AuthContext = Context<Props>;

export const filters: Record<string, Filter<AuthContext>> = {
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

export const getNextDependencies = (context: AuthContext) => {
  return filterDependencies(
    [
      { name: "nodemailer" },
      { name: "passport" },
      { name: "bcrypt" },
      { name: "@types/bcrypt", isDevDep: true },
      { name: "@types/passport", isDevDep: true },
      // type == "session"
      { name: "next-session", filters: [filters.isTypeSession] },
      // sessionStore == "prisma"
      {
        name: "@quixo3/prisma-session-store",
        filters: [filters.isTypeSession, filters.isSessionStorePrisma],
      },
      // sessionStore == "redis"
      {
        name: "ioredis",
        filters: [filters.isTypeSession, filters.isSessionStoreRedis],
      },
      {
        name: "connect-redis",
        filters: [filters.isTypeSession, filters.isSessionStoreRedis],
      },
      {
        name: "@types/connect-redis",
        isDevDep: true,
        filters: [filters.isTypeSession, filters.isSessionStoreRedis],
      },
      // type == "jwt"
      { name: "passport-jwt", filters: [filters.isTypeJwt] },
      { name: "jsonwebtoken", filters: [filters.isTypeJwt] },
      {
        name: "@types/jsonwebtoken",
        isDevDep: true,
        filters: [filters.isTypeJwt],
      },
      // scope == "local"
      { name: "passport-local", filters: [filters.hasScopeLocal] },
      {
        name: "@types/passport-local",
        isDevDep: true,
        filters: [filters.hasScopeLocal],
      },
      // scope == "google"
      {
        name: "passport-google-oauth20",
        filters: [filters.hasScopeGoogle],
      },
      {
        name: "@types/passport-google-oauth20",
        isDevDep: true,
        filters: [filters.hasScopeGoogle],
      },
    ],
    context
  );
};

export const getNextTemplates = () => {
  return [{ src: "templates/next", dest: "./" }];
};

export const getExpoDependencies = (_context: AuthContext) => {
  return [];
};

export const getExpoTemplates = () => {
  return [{ src: "templates/expo", dest: "./expo" }];
};
