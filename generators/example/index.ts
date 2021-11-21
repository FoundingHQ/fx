import { Generator, prompts } from "@founding/devkit";

type Props = {
  type: string;
};

const generator: Generator<Props> = {
  async setup(_context, options) {
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
  async scaffold(context) {
    if (context.props.type === "page") {
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
