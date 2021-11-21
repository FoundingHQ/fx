import fs from "fs";
import { join } from "path";
import { getSchema, Model } from "@mrleebo/prisma-ast";
import {
  Generator,
  prompts,
  addImport,
  createJscodeshiftProgram,
  getPrettierTransform,
  runTransforms,
} from "@founding/devkit";
import * as config from "./config";

type Props = {
  name: string;
  attributes: string;
  stack: string;
};

const generator: Generator<Props> = {
  async setup({ paths }, options = {}) {
    const res = await prompts([
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
    ]);

    // Get attributes by introspecting Prisma schema
    const source = fs.readFileSync(paths.scheme, "utf8");
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

    return { ...res, ...options, attributes };
  },
  async install() {
    return [];
  },
  async scaffold({ props: { stack }, config: { platforms } }) {
    if (stack === "full-stack") {
      const baseTemplates = [...config.baseConfig.templates];
      const platformTemplates = platforms
        .map((p) => config.resourcePlatformConfig[p].templates)
        .flat();

      return baseTemplates.concat(platformTemplates);
    }

    if (stack === "api") {
      return [...config.baseConfig.templates];
    }

    return [];
  },
  async codemods({ props: { stack, name }, config: { platforms }, paths }) {
    if (stack === "api" || !platforms.includes("mobile")) return;

    console.log("Running codemod on `expo/App.tsx`");
    const handlerPath = join(paths.mobile, "App.tsx");
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
  },
  async finish() {},
  async uninstall() {
    return {
      dependencies: config.allDependencies,
      templates: config.allTemplates,
    };
  },
};

export default generator;
