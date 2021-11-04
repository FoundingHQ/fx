import prompts from "prompts";
import { Generator } from "../../types";
import { convertTemplatePaths } from "../../config";
import {
  baseConfig,
  authTypeConfig,
  authScopeConfig,
  allDependencies,
  allTemplates,
} from "./authConfig";

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
              selected: true,
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
      ...baseConfig.templates.map(convertTemplatePaths),
      ...authTypeConfig[type].templates.map(convertTemplatePaths),
      ...scopes
        .map((scope) =>
          authScopeConfig[scope].templates.map(convertTemplatePaths)
        )
        .flat(),
    ];
  },
  codemods: async ({ type, scopes }) => {
    console.log("Running codemod on `lib/core/server/handler.ts`");
    return;
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