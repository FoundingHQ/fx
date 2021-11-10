import fs from "fs";
import prompts from "prompts";
import { getSchema, printSchema, Property } from "@mrleebo/prisma-ast";

import { Generator } from "../../types";
import { convertProjectPath, convertTemplatePaths } from "../../config";
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
            "What are the attributes of the resource?\n\nAttribute consists of prisma fieldName and fieldType\n\n(i.e. name:String description:Text)\n\n",
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
    return [...baseConfig.templates.map(convertTemplatePaths)];
  },
  codemods: async ({ name, attributes }) => {
    const schemaPath = convertProjectPath("prisma/schema.prisma");
    const source = fs.readFileSync(schemaPath, "utf8");
    const schema = getSchema(source);
    const properties = attributesToProperties(attributes);

    schema.list.push({
      type: "model",
      name,
      properties: [primaryKey, ...properties, createdAt, updatedAt],
    });

    const newSource = printSchema(schema);
    fs.writeFile(schemaPath, newSource, (err) => {
      if (err) {
        throw {
          command: "add",
          message: "Failed to write to schema",
        };
      }
    });

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
