import prompts from "prompts";
import { Generator } from "@founding/devkit";

type Context = {
  type: string;
};

const generator: Generator<Context> = {
  setup: async (options?: Record<string, any>) => {
    const res = await prompts([
      {
        type: () => (options?.type ? null : "select"),
        name: "type",
        message: "What would you like to scaffold?",
        initial: 0,
        choices: [
          {
            title: "example page",
            value: "page",
          },
          {
            title: "example api",
            value: "api",
          },
        ],
      },
    ]);

    return { ...res, ...options };
  },
  install: async () => {
    return [{ name: "@founding/fx" }];
  },
  scaffold: async ({ type }) => {
    if (type === "page") {
      return [{ src: "templates/example-page.tsx.ejs", dest: "pages" }];
    } else {
      return [{ src: "templates/example-api.ts.ejs", dest: "pages/api" }];
    }
  },
  codemods: async () => {},
  finish: async () => {},
  uninstall: async () => {
    return {
      dependencies: [],
      templates: [],
    };
  },
};

export default generator;
