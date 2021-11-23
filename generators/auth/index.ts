import { join } from "path";
import {
  Generator,
  runTransforms,
  addPrismaModel,
  addPrismaEnum,
  createJscodeshiftProgram,
  addImport,
  getPrettierTransform,
  startDocker,
  runMigrations,
  sleep,
  prompts,
} from "@founding/devkit";
import * as config from "./config";
import schemas from "./schema";

type Props = {
  type: keyof typeof config.authTypeConfig;
  scopes: (keyof typeof config.authScopeConfig)[];
};

const generator: Generator<Props> = {
  async setup(_context, options = {}) {
    const res = await prompts([
      {
        type: () => (options.type ? null : "select"),
        name: "type",
        message: "What type of authentication would you like to use?",
        initial: 0,
        choices: [
          {
            title: "Session",
            description:
              "Traditional database based session authentication. Best used for security first applications such as healthcare",
            value: "session",
          },
          {
            title: "JWT",
            description:
              "Stateless client side sessions. Best used for high such as consumer apps",
            value: "jwt",
            disabled: true,
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
    ]);

    return { ...res, ...options };
  },
  async install({ props: { type, scopes } }) {
    return [
      ...config.baseConfig.dependencies,
      ...config.authTypeConfig[type].dependencies,
      ...scopes
        .map((scope) => config.authScopeConfig[scope].dependencies)
        .flat(),
    ];
  },
  async scaffold({ props: { type, scopes } }) {
    return [
      ...config.baseConfig.templates,
      ...config.authTypeConfig[type].templates,
      ...scopes.map((scope) => config.authScopeConfig[scope].templates).flat(),
    ];
  },
  async codemods({ paths }) {
    console.log("Running codemod on `lib/core/server/handler.ts`");
    const handlerPath = join(paths.libCore, "server/handler.ts");
    const handlerTransform = async (source: string) => {
      const { program, j } = createJscodeshiftProgram(source);
      const sessionImport = j.template
        .statement`import { sessionMiddleware } from "@lib/auth/server/middlewares/session";`;
      const passportImport = j.template
        .statement`import { passport } from "@lib/auth/server/middlewares/passport";`;

      addImport(program, sessionImport);
      addImport(program, passportImport);

      program
        .find(j.VariableDeclarator, { id: { name: "middlewares" } })
        .find(j.ArrayExpression)
        .forEach((p) => {
          p.get("elements").push(
            j.template.expression`sessionMiddleware`,
            j.template.expression`passport.initialize()`,
            j.template.expression`passport.session()`
          );
        });

      return program.toSource();
    };
    await runTransforms(
      handlerPath,
      [handlerTransform],
      [getPrettierTransform(handlerPath)]
    );
    console.log();
    console.log("Running codemod on `prisma/schema.prisma`");
    await runTransforms(
      paths.scheme,
      [addPrismaModel, schemas.accountSchema],
      [addPrismaModel, schemas.userSchema],
      [addPrismaModel, schemas.tokenSchema],
      [addPrismaEnum, schemas.tokenTypeEnum],
      [addPrismaEnum, schemas.userRoleEnum]
    );
    console.log();
  },
  async finish() {
    console.log("Checking your db");
    startDocker();
    console.log();
    sleep(2000);
    runMigrations("fx add auth");
    console.log();
    return;
  },
  async uninstall() {
    return {
      dependencies: config.allDependencies,
      templates: config.allTemplates,
    };
  },
};

export default generator;
