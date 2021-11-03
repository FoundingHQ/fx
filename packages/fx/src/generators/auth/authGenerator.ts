import prompts from "prompts";
import { Generator } from "@types";
import { convertTemplatePaths, onPromptCancel } from "@config";

const typeMap = {
  session: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/auth",
        dest: "lib/auth",
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
  },
  jwt: {
    installations: {
      dependencies: ["passport-jwt", "jsonwebtoken"],
      devDependencies: ["@types/passport-jwt"],
    },
    templates: [
      {
        src: "templates/features/auth",
        dest: "lib/auth",
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
  },
};

const scopeMap = {
  local: {
    installations: {
      dependencies: ["passport-local"],
      devDependencies: ["@types/passport-local"],
    },
    templates: [],
  },
  google: {
    installations: {
      dependencies: ["passport-google-oauth20"],
      devDependencies: ["@types/passport-google-oauth20"],
    },
    templates: [],
  },
  magic: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [],
  },
};

type Context = {
  type: keyof typeof typeMap;
  scopes: (keyof typeof scopeMap)[];
};

export default {
  setup: async () => {
    const res = await prompts(
      [
        {
          type: "select",
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
          type: "multiselect",
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
          hint: "- Space to select. Return to submit",
        },
      ],
      {
        onCancel: onPromptCancel,
      }
    );

    return res;
  },
  install: async ({ type, scopes }) => {
    const installations = {
      dependencies: ["nodemailer", "passport"],
      devDependencies: ["@types/bcrypt", "@types/passport"],
    };

    // Install additional dependencies based off authentication type
    installations.dependencies.push(
      ...typeMap[type].installations.dependencies
    );
    installations.devDependencies.push(
      ...typeMap[type].installations.devDependencies
    );

    // Install additional dependencies based off authentication scopes
    installations.dependencies.push(
      ...scopes
        .map((scope) => scopeMap[scope].installations.dependencies)
        .flat()
    );
    installations.devDependencies.push(
      ...scopes
        .map((scope) => scopeMap[scope].installations.devDependencies)
        .flat()
    );

    return installations;
  },
  scaffold: async ({ type, scopes }) => {
    const typeTemplates = typeMap[type].templates.map(convertTemplatePaths);
    const scopeTemplates = scopes
      .map((scope) => scopeMap[scope].templates.map(convertTemplatePaths))
      .flat();

    return [...typeTemplates, ...scopeTemplates];
  },
  codemods: async ({ type, scopes }) => {
    console.log("Running codemod on `lib/core/server/handler.ts`");
    return;
  },
  finish: async ({ type, scopes }) => {
    return;
  },
} as Generator<Context>;
