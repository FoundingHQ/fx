import { createTransformPassport } from "./authCodemods";

export const baseConfig = {
  installations: {
    dependencies: ["nodemailer", "passport"],
    devDependencies: ["@types/bcrypt", "@types/passport"],
  },
  templates: [
    {
      src: "templates/features/auth/components",
      dest: "lib/auth/components",
    },
    {
      src: "templates/features/auth/data",
      dest: "lib/auth/data",
    },
    {
      src: "templates/features/auth/server/middlewares",
      dest: "lib/auth/server/middlewares",
    },
    {
      src: "templates/features/auth/server/middlewares/passport.ts",
      dest: "lib/auth/server/middlewares/passport.ts",
      createTransform: createTransformPassport,
    },
    {
      src: "templates/features/auth/server/authConfig.ts",
      dest: "lib/auth/server/authConfig.ts",
    },
    {
      src: "templates/features/auth/server/authService.ts",
      dest: "lib/auth/server/authService.ts",
    },
    {
      src: "templates/features/users",
      dest: "lib/users",
    },
    {
      src: "templates/features/pages/[...authApi].ts",
      dest: "pages/api/auth/[...authApi].ts",
    },
  ],
};

// session | jwt auth types
export const authTypeConfig = {
  session: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [],
  },
  jwt: {
    installations: {
      dependencies: ["passport-jwt", "jsonwebtoken"],
      devDependencies: ["@types/passport-jwt"],
    },
    templates: [
      {
        src: "templates/features/auth/server/strategy/jwt.ts",
        dest: "lib/auth/server/strategy/jwt.ts",
      },
    ],
  },
};

export const authScopeConfig = {
  local: {
    installations: {
      dependencies: ["passport-local"],
      devDependencies: ["@types/passport-local"],
    },
    templates: [
      {
        src: "templates/features/auth/server/strategy/local.ts",
        dest: "lib/auth/server/strategy/local.ts",
      },
    ],
  },
  google: {
    installations: {
      dependencies: ["passport-google-oauth20"],
      devDependencies: ["@types/passport-google-oauth20"],
    },
    templates: [
      {
        src: "templates/features/auth/server/strategy/google.ts",
        dest: "lib/auth/server/strategy/google.ts",
      },
    ],
  },
  magic: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [],
  },
};
