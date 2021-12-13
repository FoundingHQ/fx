import {
  Generator,
  readJson,
  writeJson,
  readFile,
  writeFile,
} from "@founding/devkit";

type Props = {};

const generator: Generator<Props> = {
  async setup(_context, options) {
    return { ...options };
  },
  async install() {
    const nextjsDeps = [
      { name: "@prisma/client" },
      { name: "next-connect" },
      { name: "cross-fetch" },
      { name: "react-query" },
      { name: "redaxios" },
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
      { src: "templates/.env.example.ejs", dest: ".env.example" },
      { src: "templates/docker-compose.yml.ejs", dest: "docker-compose.yml" },
      { src: "templates/fetcher.ts.ejs", dest: "lib/core/util/fetcher.ts" },
      {
        src: "templates/trustProxy.ts.ejs",
        dest: "lib/core/api/middlewares/trustProxy.ts",
      },
      { src: "templates/handler.ts.ejs", dest: "lib/core/api/handler.ts" },
      { src: "templates/prisma.ts.ejs", dest: "lib/core/api/prisma.ts" },
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
      "@ui/*": ["lib/core/ui/*"],
      "@api/*": ["lib/core/api/*"],
      "@util/*": ["lib/core/util/*"],
      "@lib/*": ["lib/*"],
    };

    writeJson(tsConfigPath, tsConfig, { spaces: 2 });

    const packageJsonPath = context.paths.packageJson;
    const packageJson = readJson(packageJsonPath);

    packageJson.scripts = {
      ...packageJson.scripts,
      "docker:start": "docker-compose up -d",
      "docker:stop": "docker-compose down",
      "prisma:generate": "dotenv -e .env.local -- prisma generate",
      "prisma:migrate:dev":
        'TS_NODE_COMPILER_OPTIONS=\'{"module":"commonjs"}\' dotenv -e .env.local -- prisma migrate dev',
      "prisma:migrate:prod":
        'TS_NODE_COMPILER_OPTIONS=\'{"module":"commonjs"}\' dotenv -e .env.local -- prisma migrate deploy',
      "prisma:reset":
        'TS_NODE_COMPILER_OPTIONS=\'{"module":"commonjs"}\' dotenv -e .env.local -- prisma migrate reset',
      "prisma:seed":
        'TS_NODE_COMPILER_OPTIONS=\'{"module":"commonjs"}\' dotenv -e .env.local -- prisma db seed',
    };

    writeJson(packageJsonPath, packageJson, { spaces: 2 });

    const envContents = readFile(context.paths.envExample);
    writeFile(context.paths.env, envContents, true);

    return [tsConfigPath, packageJsonPath];
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
