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
      dependencies: ["express-session", "redis", "connect-redis"],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/auth/server/strategy/session.ts",
        dest: "lib/auth/server/strategy/session.ts",
      },
      {
        src: "templates/features/auth/server/authService[session].ts",
        dest: "lib/auth/server/authService.ts",
      },
    ],
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
      {
        src: "templates/features/auth/server/authService[jwt].ts",
        dest: "lib/auth/server/authService.ts",
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

export const allDependencies = [
  ...baseConfig.installations.dependencies,
  ...baseConfig.installations.devDependencies,
  ...Object.values(authTypeConfig)
    .map((c) => {
      return [
        ...c.installations.dependencies,
        ...c.installations.devDependencies,
      ];
    })
    .flat(),
  ...Object.values(authScopeConfig)
    .map((c) => {
      return [
        ...c.installations.dependencies,
        ...c.installations.devDependencies,
      ];
    })
    .flat(),
];

export const allTemplates = [
  ...baseConfig.templates.map((t) => t.dest),
  ...Object.values(authTypeConfig)
    .map((c) => c.templates.map((t) => t.dest))
    .flat(),
  ...Object.values(authScopeConfig)
    .map((c) => c.templates.map((t) => t.dest))
    .flat(),
];
