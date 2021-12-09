import { join } from "path";
import {
  runTransforms,
  addPrismaModel,
  addPrismaEnum,
  createJscodeshiftProgram,
  addImport,
  transformPrettier,
  syncGeneratorMigrations,
  prompts,
  extractFilterableList,
} from "@founding/devkit";
import { AuthGenerator, dependencies, templates, filters } from "./config";
import * as schemas from "./schema";

const generator: AuthGenerator = {
  async setup(_context, options) {
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

    return {
      ...res,
      // default to prisma session store for now
      sessionStore: res.type === "session" ? "prisma" : undefined,
      ...options,
      f: filters,
    };
  },
  async install(context) {
    return extractFilterableList(dependencies, context);
  },
  async scaffold(context) {
    return extractFilterableList(templates, context);
  },
  async codemods(context) {
    const handlerPath = join(context.paths.libCore, "server/handler.ts");
    const schemaPath = context.paths.scheme;

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
      [transformPrettier(handlerPath)]
    );

    await runTransforms(
      schemaPath,
      [addPrismaModel, schemas.accountSchema],
      [addPrismaModel, schemas.userSchema],
      [addPrismaModel, schemas.tokenSchema],
      [addPrismaEnum, schemas.tokenTypeEnum],
      [addPrismaEnum, schemas.userRoleEnum]
    );

    if (filters.isSessionStorePrisma(context)) {
      await runTransforms(schemaPath, [addPrismaModel, schemas.sessionSchema]);
    }

    return [handlerPath, schemaPath];
  },
  async finish() {
    const res = await prompts({
      type: "confirm",
      name: "value",
      message: "Would you like to run migrations?",
      initial: true,
    });

    if (res.value) {
      await syncGeneratorMigrations("fx_add_auth");
    }
  },
  async uninstall() {
    return {
      dependencies: dependencies
        .map((d) => d.list)
        .flat()
        .map((d) => d.name),
      templates: templates
        .map((t) => t.list)
        .flat()
        .map((t) => t.dest),
    };
  },
};

export default generator;
