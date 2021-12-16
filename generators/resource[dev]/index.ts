import { join } from "path";
import {
  prompts,
  addImport,
  createJscodeshiftProgram,
  runTransforms,
  readFile,
  produceSchema,
  logger,
  runPrismaCodegen,
} from "@founding/devkit";
import { ResourceGenerator, getDependencies, getTemplates } from "./config";

const generator: ResourceGenerator = {
  async setup({ paths, h }, options = {}) {
    const res = await prompts([
      {
        type: () => (options.name ? null : "text"),
        name: "name",
        message: "What is the name of the resource?",
      },
    ]);

    // Get attributes by introspecting Prisma schema
    const source = readFile(paths.scheme);

    const attributes: Record<string, any> = {};
    const systemFields = ["id", "createdAt", "updatedAt"];

    await produceSchema(source, ({ list }) => {
      const modelName = h.capitalize(res.name);
      const [existingModel] = list.filter((item) => {
        return item.type === "model" && item.name === modelName;
      });

      if (!existingModel) {
        logger.error(`Cannot find "${modelName}" Model in your schema`);
        process.exit(1);
      }

      const properties = existingModel.properties;
      (properties || []).forEach((property) => {
        if (property.type === "field") {
          const { name, fieldType } = property as Record<
            "name" | "fieldType",
            string
          >;
          if (!systemFields.includes(name)) {
            attributes[name] = {
              name,
              pascalName: h.changeCase.pascalCase(name),
              camelName: h.changeCase.camelCase(name),
              fieldType,
            };
          }
        }
      });
    });

    const pluralName = h.inflection.pluralize(res.name);
    const pascalName = h.changeCase.pascalCase(res.name);
    const camelName = h.changeCase.camelCase(res.name);
    const paramName = h.changeCase.paramCase(res.name);

    const apiName = h.changeCase.paramCase(pluralName);
    const createName = `create${pascalName}`;
    const getName = `get${pascalName}`;
    const getListName = `get${pascalName}List`;
    const updateName = `update${pascalName}`;
    const deleteName = `delete${pascalName}`;
    const idTypeName = `Pick<${pascalName}, "id">`;
    const createInputTypeName = `Prisma.${pascalName}CreateInput`;
    const updateInputTypeName = `${idTypeName} & Prisma.${pascalName}UpdateInput`;

    return {
      ...res,
      ...options,
      attributes,
      pluralName,
      pascalName,
      camelName,
      paramName,
      apiName,
      createName,
      getName,
      getListName,
      updateName,
      deleteName,
      idTypeName,
      createInputTypeName,
      updateInputTypeName,
    };
  },
  async install(context) {
    return getDependencies(context);
  },
  async scaffold(context) {
    return getTemplates(context);
  },
  async codemods({ props: { name }, config: { frameworks }, paths }) {
    if (!frameworks.includes("expo")) return [];

    const mobilePath = join(paths.mobile, "App.tsx");
    const screenTransform = async (source: string) => {
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

    await runTransforms(mobilePath, [screenTransform]);

    return [mobilePath];
  },
  async finish() {
    await runPrismaCodegen();
  },
  async uninstall() {
    return {
      dependencies: [],
      templates: [],
    };
  },
};

export default generator;
