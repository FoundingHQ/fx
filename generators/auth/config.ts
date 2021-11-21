import { GeneratorConfigDefinition } from "@founding/devkit";

export const baseConfig: GeneratorConfigDefinition = {
  dependencies: [
    { name: "nodemailer" },
    { name: "passport" },
    { name: "bcrypt" },
    { name: "@types/bcrypt", isDevDep: true },
    { name: "@types/passport", isDevDep: true },
  ],
  templates: [
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
    {
      src: "templates/expo/screens",
      dest: "expo/screens",
    },
    {
      src: "templates/expo/components",
      dest: "lib/auth/expo",
    },
  ],
};

// session | jwt auth types
export const authTypeConfig: Record<string, GeneratorConfigDefinition> = {
  session: {
    dependencies: [
      { name: "next-session" },
      { name: "ioredis" },
      { name: "connect-redis" },
      { name: "@types/connect-redis", isDevDep: true },
    ],
    templates: [
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
  jwt: {
    dependencies: [
      { name: "passport-jwt" },
      { name: "jsonwebtoken" },
      { name: "@types/jsonwebtoken", isDevDep: true },
    ],
    templates: [
      {
        src: "templates/lib/auth/server/strategy/jwt.ts",
        dest: "lib/auth/server/strategy/jwt.ts",
      },
    ],
  },
};

export const authScopeConfig: Record<string, GeneratorConfigDefinition> = {
  local: {
    dependencies: [
      { name: "passport-local" },
      { name: "@types/passport-local", isDevDep: true },
    ],
    templates: [
      {
        src: "templates/lib/auth/server/strategy/local.ts",
        dest: "lib/auth/server/strategy/local.ts",
      },
    ],
  },
  google: {
    dependencies: [
      { name: "passport-google-oauth20" },
      { name: "@types/passport-google-oauth20", isDevDep: true },
    ],
    templates: [
      {
        src: "templates/lib/auth/server/strategy/google.ts",
        dest: "lib/auth/server/strategy/google.ts",
      },
    ],
  },
  magic: {
    dependencies: [],
    templates: [],
  },
};

export const allDependencies = [
  ...baseConfig.dependencies.map((d) => d.name),
  ...Object.values(authTypeConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(authScopeConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
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
