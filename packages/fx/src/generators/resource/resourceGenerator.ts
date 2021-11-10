import fs from "fs";
import prompts from "prompts";
import {
  getSchema,
  KeyValue,
  printSchema,
  Property,
} from "@mrleebo/prisma-ast";

import { Generator } from "../../types";
import { convertProjectPath, convertTemplatePaths } from "../../config";
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
    return [...baseConfig.templates.map(convertTemplatePaths)];
  },
  codemods: async ({ name, attributes }) => {
    const schemaPath = convertProjectPath("prisma/schema.prisma");
    const source = fs.readFileSync(schemaPath, "utf8");
    const schema = getSchema(source);

    const properties: Array<Property> = attributes
      .split(" ")
      .map((attribute: string) => {
        const [fieldName, fieldType] = attribute.split(":");
        return { type: "field", name: fieldName, fieldType };
      });

    const primaryKey: any = {
      type: "field",
      name: "id",
      fieldType: "String",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "id",
          kind: "field",
          group: "",
        },
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "cuid",
              },
            },
          ],
        },
      ],
    };

    const createdAt: any = {
      type: "field",
      name: "createdAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "now",
              },
            },
          ],
        },
      ],
    };

    const updatedAt: any = {
      type: "field",
      name: "updatedAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "updatedAt",
          kind: "field",
        },
      ],
    };

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
