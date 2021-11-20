import prompts from "prompts";
import { Generator } from "@founding/devkit";

type Context = {
  type: string;
};

const generator: Generator<Context> = {
  async setup(options) {
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
  async install() {
    return [{ name: "@founding/fx" }];
  },
  async scaffold({ type }) {
    if (type === "page") {
      return [
        { src: "templates/example-page.tsx.ejs", dest: "pages/example.tsx" },
      ];
    } else {
      return [
        { src: "templates/example-api.ts.ejs", dest: "pages/api/example.tsx" },
      ];
    }
  },
  async codemods() {},
  async finish() {},
  async uninstall() {
    return {
      dependencies: ["@founding/fx"],
      templates: [],
    };
  },
};

export default generator;
