import prompts from "prompts";
import { runTransforms, addPrismaModel, addPrismaEnum } from "@founding/devkit";
import { Generator } from "../../types";
import { getProjectPath } from "../../config";
import {
  baseConfig,
  authTypeConfig,
  authScopeConfig,
  allDependencies,
  allTemplates,
} from "./authConfig";
import accountSchema from "./schema/account";
import userSchema from "./schema/user";
import tokenSchema from "./schema/token";
import tokenTypeEnum from "./schema/tokenType";
import userRoleEnum from "./schema/userRole";

type Context = {
  type: keyof typeof authTypeConfig;
  scopes: (keyof typeof authScopeConfig)[];
};

export default {
  setup: async (options = {}) => {
    const res = await prompts(
      [
        {
          type: () => (options.type ? null : "select"),
          name: "type",
          message: "What type of authentication would you like to use?",
          initial: 0,
          choices: [
            {
              title: "Session",
              description:
                "Traditional database based session authentication. Best used for security first applications such as heealthcare",
              value: "session",
            },
            {
              title: "JWT",
              description:
                "Stateless client side sessions. Best used for high such as consumer apps",
              value: "jwt",
            },
          ],
        },
        {
          type: () =>
            options.scopes && options.scopes.length ? null : "multiselect",
          name: "scopes",
          message:
            "What type of authentication strategies would you like to add?",
          min: 1,
          choices: [
            {
              title: "Local",
              description: "Email/Password login",
              value: "local",
              selected: true,
            },
            {
              title: "Google",
              description: "Google OAuth",
              value: "google",
              selected: false,
            },
            {
              title: "Facebook",
              description: "Facebook OAuth",
              value: "facebook",
              selected: false,
            },
            {
              title: "Magic Link",
              description: "Passwordless email (or phone) login",
              value: "magic",
              selected: false,
            },
          ],
        },
      ],
      {
        onCancel: () => {
          throw {
            command: "add",
            message: "User cancelled setup",
          };
        },
      }
    );

    return { ...res, ...options };
  },
  install: async ({ type, scopes }) => {
    return {
      dependencies: [
        ...baseConfig.installations.dependencies,
        ...authTypeConfig[type].installations.dependencies,
        ...scopes
          .map((scope) => authScopeConfig[scope].installations.dependencies)
          .flat(),
      ],
      devDependencies: [
        ...baseConfig.installations.devDependencies,
        ...authTypeConfig[type].installations.devDependencies,
        ...scopes
          .map((scope) => authScopeConfig[scope].installations.devDependencies)
          .flat(),
      ],
    };
  },
  scaffold: async ({ type, scopes }) => {
    return [
      ...baseConfig.templates,
      ...authTypeConfig[type].templates,
      ...scopes.map((scope) => authScopeConfig[scope].templates).flat(),
    ];
  },
  codemods: async ({ type, scopes }) => {
    console.log("Running codemod on `lib/core/server/handler.ts`");
    console.log();
    console.log("Running codemod on `prisma/schema.prisma`");
    const schemaPath = getProjectPath("prisma/schema.prisma");
    await runTransforms(
      schemaPath,
      [
        addPrismaModel,
        addPrismaModel,
        addPrismaModel,
        addPrismaEnum,
        addPrismaEnum,
      ],
      [accountSchema, userSchema, tokenSchema, tokenTypeEnum, userRoleEnum]
    );
    console.log();
  },
  finish: async ({ type, scopes }) => {
    return;
  },
  uninstall: async () => {
    return {
      dependencies: allDependencies,
      templates: allTemplates,
    };
  },
} as Generator<Context>;
