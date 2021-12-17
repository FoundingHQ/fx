import { join } from "path";
import {
  Generator,
  Context,
  addImport,
  createJscodeshiftProgram,
  runTransforms,
} from "@founding/devkit";

export type Props = {
  name: string;
  attributes: string;
};

export type ResourceGenerator = Generator<Props>;
export type ResourceContext = Context<Props>;

export const getNextTemplates = () => {
  return [{ src: "templates/next", dest: "./" }];
};

export const runNextCodemods = async (_context: ResourceContext) => {
  return [] as string[];
};

export const getExpoTemplates = () => {
  return [{ src: "templates/expo", dest: "./expo" }];
};

export const runExpoCodemods = async (context: ResourceContext) => {
  const mobilePath = join(context.paths.mobile, "App.tsx");
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
};
