import { Generator, readJson, writeJson } from "@founding/devkit";

type Props = {};

const generator: Generator<Props> = {
  async setup(_context, options) {
    return { ...options };
  },
  async install() {
    const nextjsDeps = [
      { name: "@prisma/client" },
      { name: "cross-fetch" },
      { name: "next-connect" },
      { name: "react-query" },
      { name: "dotenv-cli", isDevDep: true },
      { name: "prisma", isDevDep: true },
    ];

    const expoDeps = [
      { name: "expo" },
      { name: "@react-navigation/native-stack" },
      { name: "expo-status-bar" },
      { name: "react-native" },
      { name: "react-native-safe-area-context" },
      { name: "react-native-screens" },
      { name: "@types/react-native", isDevDep: true },
    ];

    return nextjsDeps;
  },
  async scaffold() {
    const nextjsTemplates = [
      { src: "templates/_app.tsx.ejs", dest: "pages/_app.tsx" },
      { src: "templates/.env.ejs", dest: ".env" },
      { src: "templates/docker-compose.yml.ejs", dest: "docker-compose.yml" },
      { src: "templates/query.ts.ejs", dest: "lib/core/util/query.ts" },
      {
        src: "templates/trustProxy.ts.ejs",
        dest: "lib/core/server/middlewares/trustProxy.ts",
      },
      { src: "templates/handler.ts.ejs", dest: "lib/core/server/handler.ts" },
      { src: "templates/prisma.ts.ejs", dest: "lib/core/server/prisma.ts" },
      { src: "templates/schema.prisma.ejs", dest: "prisma/schema.prisma" },
      { src: "templates/seed.ts.ejs", dest: "prisma/seed.ts" },
    ];

    const expoTemplates = [];

    return nextjsTemplates;
  },
  async codemods(context) {
    const tsConfigPath = context.paths.tsConfig;
    const tsConfig = readJson(tsConfigPath);

    tsConfig.compilerOptions.baseUrl = tsConfig.compilerOptions.baseUrl || ".";
    tsConfig.compilerOptions.paths = {
      ...(tsConfig.compilerOptions.paths || {}),
      "@ui": ["lib/core/ui/*"],
      "@server/*": ["lib/core/server/*"],
      "@util/*": ["lib/core/util/*"],
      "@lib/*": ["lib/*"],
    };

    writeJson(tsConfigPath, tsConfig, { spaces: 2 });

    return [tsConfigPath];
  },
  async finish() {},
  async uninstall() {
    return {
      dependencies: [],
      templates: [],
    };
  },
};

export default generator;
