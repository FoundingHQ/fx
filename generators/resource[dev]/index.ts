import { join } from "path";
import {
  Generator,
  prompts,
  throwHandledError,
  addImport,
  createJscodeshiftProgram,
  runTransforms,
  readFile,
  produceSchema,
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
    ]);

    // Get attributes by introspecting Prisma schema
    const source = readFile(paths.scheme);

    const attributes: Record<string, string> = {};
    const systemFields = ["id", "createdAt", "updatedAt"];

    produceSchema(source, ({ list }) => {
      const [existingModel] = list.filter((item) => {
        return item.type === "model" && item.name === res.name;
      });

      if (!existingModel) {
        throwHandledError({
          command: "setup",
          message: `Cannot find "${res}" Model in your schema`,
        });
      }

      const properties = existingModel.properties;
      (properties || []).forEach((property) => {
        if (property.type === "field") {
          const propertyName = property.name;
          const propertyFieldType = property.fieldType;
          if (!systemFields.includes(propertyName)) {
            attributes[propertyName] = propertyFieldType;
          }
        }
      });
    });

    return { ...res, ...options, attributes };
  },
  async install() {
    return [];
  },
  async scaffold({ props: { stack }, config: { frameworks } }) {
    if (stack === "full-stack") {
      const baseTemplates = [...config.baseConfig.templates];
      const frameworkTemplates = frameworks
        .map((p) => config.resourceFrameworkConfig[p].templates)
        .flat();

      return baseTemplates.concat(frameworkTemplates);
    }

    if (stack === "api") {
      return [...config.baseConfig.templates];
    }

    return [];
  },
  async codemods({ props: { stack, name }, config: { frameworks }, paths }) {
    if (stack === "api" || !frameworks.includes("expo")) return;

    console.log("Running codemod on `expo/App.tsx`");
    const mobilePath = join(paths.mobile, "App.tsx");
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

    await runTransforms(mobilePath, [handlerTransform]);

    return [mobilePath];
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
