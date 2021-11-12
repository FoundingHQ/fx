import fs from "fs";
import prompts from "prompts";
import { runTransforms, addPrismaModel } from "@founding/devkit";

import { Generator } from "../../types";
import { getProjectPath } from "../../config";
import { baseConfig } from "./resourceConfig";
import {
  primaryKey,
  createdAt,
  updatedAt,
  attributesToProperties,
} from "./util/prisma";

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
          message:
            "What are the attributes of the resource?\n\nAttribute consists of prisma fieldName and fieldType\n\n(i.e. name:String ordinal:Int)\n\n",
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
    return [...baseConfig.templates];
  },
  codemods: async ({ name, attributes }) => {
    const schemaPath = getProjectPath("prisma/schema.prisma");
    const properties = attributesToProperties(attributes);

    const resourceSchema = {
      type: "model",
      name,
      properties: [primaryKey, ...properties, createdAt, updatedAt],
    };

    await runTransforms(schemaPath, [addPrismaModel], [resourceSchema]);
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
