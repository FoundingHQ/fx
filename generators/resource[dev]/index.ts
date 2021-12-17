import {
  prompts,
  readFile,
  produceSchema,
  logger,
  syncGeneratorMigrations,
  ScaffoldPath,
  Package,
} from "@founding/devkit";
import {
  ResourceGenerator,
  getNextTemplates,
  runNextCodemods,
  getExpoTemplates,
  runExpoCodemods,
} from "./config";

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
          if (!systemFields.includes(property.name)) {
            attributes[property.name] = {
              ...property,
              pascalName: h.changeCase.pascalCase(property.name),
              camelName: h.changeCase.camelCase(property.name),
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
  async install() {
    const dependencies: Package[] = [];
    return dependencies;
  },
  async scaffold(context) {
    const templates: ScaffoldPath[] = [];

    if (context.config.frameworks.includes("next")) {
      templates.push(...getNextTemplates());
    }

    if (context.config.frameworks.includes("expo")) {
      templates.push(...getExpoTemplates());
    }

    return templates;
  },
  async codemods(context) {
    const pathsChanged: string[] = [];

    if (context.config.frameworks.includes("next")) {
      pathsChanged.push(...(await runNextCodemods(context)));
    }

    if (context.config.frameworks.includes("expo")) {
      pathsChanged.push(...(await runExpoCodemods(context)));
    }

    return pathsChanged;
  },
  async finish(context) {
    const res = await prompts({
      type: "confirm",
      name: "value",
      message: "Would you like to run migrations?",
      initial: true,
    });

    if (res.value) {
      await syncGeneratorMigrations(`fx_add_resource_${context.props.name}`);
    }
  },
  async uninstall() {
    return {
      dependencies: [],
      templates: [],
    };
  },
};

export default generator;
