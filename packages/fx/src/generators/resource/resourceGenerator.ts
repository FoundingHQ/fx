import prompts from "prompts";
import { Generator } from "../../types";
import { convertTemplatePaths } from "../../config";
import { baseConfig } from "./resourceConfig";

type Context = {
  name: string;
  attributes: string;
};

export default {
  setup: async (options = {}) => {
    const res = await prompts(
      [
        {
          type: () => (options.name ? null : "text"),
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
  install: async () => {
    return {
      dependencies: [],
      devDependencies: [],
    };
  },
  scaffold: async ({ name }) => {
    const { templates } = baseConfig(name);
    return [...templates.map(convertTemplatePaths)];
  },
  codemods: async ({ name, attributes }) => {
    console.log(`Code mods: ${name}, attributes: ${attributes}`);
    // TODO: update prisma schema

    return;
  },
  finish: async ({ name, attributes }) => {
    console.log(`Finish: ${name}, attributes: ${attributes}`);

    return;
  },
  uninstall: async () => {
    return {
      dependencies: [],
      templates: [],
    };
  },
} as Generator<Context>;
