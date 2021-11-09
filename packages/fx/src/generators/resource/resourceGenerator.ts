import prompts from "prompts";
import { Generator } from "../../types";
import { convertTemplatePaths } from "../../config";
import { baseConfig, allDependencies, allTemplates } from "./resourceConfig";

type Context = {
  name: string;
  attributes: string;
};

export default {
  setup: async (options = {}) => {
    const res = await prompts(
      [
        {
          type: () => (options.type ? null : "text"),
          name: "name",
          message: "What is the name of the resource?",
        },
        {
          type: () => (options.attributes ? null : "text"),
          name: "attributes",
          message: "What are the attributes of the resource?",
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

    return { ...res, ...options };
  },
  install: async ({ name, attributes }) => {
    return {
      dependencies: [...baseConfig.installations.dependencies],
      devDependencies: [...baseConfig.installations.devDependencies],
    };
  },
  scaffold: async ({ name, attributes }) => {
    console.log(`Scaffold name: ${name}, attributes: ${attributes}`);

    return [...baseConfig.templates.map(convertTemplatePaths)];
  },
  codemods: async ({ name, attributes }) => {
    console.log(`Code mods: ${name}, attributes: ${attributes}`);

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
} as Generator<Context>;
