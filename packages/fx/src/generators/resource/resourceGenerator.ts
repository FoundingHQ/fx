import fs from "fs";
import { getSchema, Model } from "@mrleebo/prisma-ast";
import prompts from "prompts";

import {
  addImport,
  createJscodeshiftProgram,
  Generator,
  getPrettierTransform,
  runTransforms,
} from "@founding/devkit";
import { getProjectPath, getPlatform } from "../../config";
import {
  baseConfig,
  resourcePlatformConfig,
  allTemplates,
  allDependencies,
} from "./resourceConfig";

type Context = {
  name: string;
  attributes: string;
  stack: string;
  platform: Array<string>;
};

const generator: Generator<Context> = {
  setup: async (options = {}) => {
    const res = await prompts(
      [
        {
          type: () => (options.name ? null : "text"),
          name: "name",
          message: "What is the name of the resource?",
        },
        {
          type: () => (options.stack ? null : "select"),
          name: "stack",
          message: "What do you want to generate?",
          initial: 0,
          choices: [
            {
              title: "Full Stack",
              description: "Frontend and backend",
              value: "full-stack",
            },
            {
              title: "API only",
              description: "Backend only",
              value: "api",
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

    // Get attributes by introspecting Prisma schema
    const schemaPath = getProjectPath("prisma/schema.prisma");
    const source = fs.readFileSync(schemaPath, "utf8");
    const schema = getSchema(source);

    const list = schema["list"];
    const [existingModel] = list.filter((item) => {
      return item.type === "model" && item.name === res.name;
    });

    const attributes: any = {};
    const systemFields = ["id", "createdAt", "updatedAt"];

    if (existingModel) {
      const properties = (existingModel as Model).properties;
      properties.forEach((property) => {
        if (property["type"] === "field") {
          const propertyName = property["name"];
          const propertyFieldType = property["fieldType"];

          if (!systemFields.includes(propertyName)) {
            attributes[propertyName] = propertyFieldType;
          }
        }
      });
    }

    const platform = getPlatform();

    return { ...res, ...options, attributes, platform };
  },
  install: async () => {
    return [];
  },
  scaffold: async ({ stack, platform }) => {
    if (stack === "full-stack") {
      let templates = [...baseConfig.templates];

      if (platform.includes("web")) {
        templates = templates.concat(resourcePlatformConfig.web.templates);
      }

      if (platform.includes("mobile")) {
        templates = templates.concat(resourcePlatformConfig.mobile.templates);
      }

      return templates;
    }

    if (stack === "api") {
      return [...baseConfig.templates];
    }

    return [];
  },
  codemods: async ({ stack, name, platform }) => {
    if (stack === "api" || !platform.includes("mobile")) {
      return;
    }

    console.log("Running codemod on `expo/App.tsx`");
    const handlerPath = getProjectPath("expo/App.tsx");
    const handlerTransform = async (source: string) => {
      const crudScreen = ["Edit", "List", "New", "Show"];

      let { program, j } = createJscodeshiftProgram(source);

      crudScreen.forEach((screen) => {
        const importStatement = `import ${name}${screen}Screen from "./screens/${name}${screen}Screen";`;
        const screenExpression = `{
          name: "${name}${screen}",
          component: ${name}${screen}Screen,
        }`;

        addImport(program, j.template.statement([importStatement]));

        program
          .find(j.VariableDeclarator, { id: { name: "screens" } })
          .find(j.ArrayExpression)
          .forEach((p) =>
            p.get("elements").push(j.template.expression([screenExpression]))
          );
      });

      return program.toSource();
    };

    await runTransforms(
      handlerPath,
      [handlerTransform],
      [getPrettierTransform(handlerPath)]
    );

    return;
  },
  finish: async ({ name, attributes }) => {
    console.log(`Finish: ${name}, attributes: ${attributes}`);

    return;
  },
  uninstall: async () => {
    return {
      dependencies: allDependencies,
      templates: allTemplates,
    };
  },
};

export default generator;
