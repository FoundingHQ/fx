import { Generator, Context } from "@founding/devkit";

export type Props = {
  name: string;
  attributes: string;
};

export type ResourceGenerator = Generator<Props>;
export type ResourceContext = Context<Props>;

export const getDependencies = (_context: ResourceContext) => {
  return [];
};

export const getTemplates = (context: ResourceContext) => {
  const templates = [];

  if (context.config.frameworks.includes("next")) {
    templates.push({ src: "templates/next", dest: "./" });
  }

  return templates;
};
