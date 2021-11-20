import fs from "fs";
import { getSchema, Model } from "@mrleebo/prisma-ast";
import prompts from "prompts";

import { Generator } from "@founding/devkit";
import { getProjectPath, getPlatform } from "../../config";
import {
  baseConfig,
  resourcePlatformConfig,
  allTemplates,
  allDependencies,
} from "./resourceConfig";

type Context = {
  name: string;
  attributes: string;
  stack: string;
  platform: Array<string>;
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
        {
          type: () => (options.stack ? null : "select"),
          name: "stack",
          message: "What do you want to generate?",
          initial: 0,
          choices: [
            {
              title: "Full Stack",
              description: "Frontend and backend",
              value: "full-stack",
            },
            {
              title: "API only",
              description: "Backend only",
              value: "api",
            },
          ],
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

    // Get attributes by introspecting Prisma schema
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

    const platform = getPlatform();

    return { ...res, ...options, attributes, platform };
  },
  install: async () => {
    return [];
  },
  scaffold: async ({ stack, platform }) => {
    if (stack === "full-stack") {
      let templates = [...baseConfig.templates];

      if (platform.includes("web")) {
        templates = templates.concat(resourcePlatformConfig.web.templates);
      }

      if (platform.includes("mobile")) {
        templates = templates.concat(resourcePlatformConfig.mobile.templates);
      }

      return templates;
    }

    if (stack === "api") {
      return [...baseConfig.templates];
    }

    return [];
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
      dependencies: allDependencies,
      templates: allTemplates,
    };
  },
};

export default generator;
