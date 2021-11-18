import fs from "fs";
import { getSchema, Model } from "@mrleebo/prisma-ast";
import prompts from "prompts";
import { Generator, runTransforms, addPrismaModel } from "@founding/devkit";
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

const generator: Generator<Context> = {
  setup: async (options = {}) => {
    const res = await prompts(
      [
        {
          type: () => (options.name ? null : "text"),
          name: "name",
          message: "What is the name of the resource?",
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

    const schemaPath = getProjectPath("prisma/schema.prisma");
    const source = fs.readFileSync(schemaPath, "utf8");
    const schema = getSchema(source);

    const list = schema["list"];
    const [existingModel] = list.filter((item) => {
      return item.type === "model" && item.name === res.name;
    });

    const attributes: any = {};
    const systemFields = ["id", "createdAt", "updatedAt"];

    if (existingModel) {
      const properties = (existingModel as Model).properties;
      properties.forEach((property) => {
        if (property["type"] === "field") {
          const propertyName = property["name"];
          const propertyFieldType = property["fieldType"];

          if (!systemFields.includes(propertyName)) {
            attributes[propertyName] = propertyFieldType;
          }
        }
      });
    }

    return { ...res, ...options, attributes };
  },
  install: async () => {
    return [];
  },
  scaffold: async ({ name }) => {
    return [...baseConfig.templates];
  },
  codemods: async () => {
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
};

export default generator;
