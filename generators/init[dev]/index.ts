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
  async install(context) {
    const deps = [];

    if (context.config.frameworks.includes("next")) {
      deps.push(
        ...[
          { name: "@prisma/client" },
          { name: "next-connect" },
          { name: "cross-fetch" },
          { name: "react-query" },
          { name: "redaxios" },
          { name: "cookie" },
          { name: "dotenv-cli", isDevDep: true },
          { name: "prisma", isDevDep: true },
          { name: "@types/cookie", isDevDep: true },
        ]
      );
    }

    if (context.config.frameworks.includes("remix")) {
      deps.push(
        ...[
          { name: "@prisma/client" },
          { name: "dotenv-cli", isDevDep: true },
          { name: "prisma", isDevDep: true },
        ]
      );
    }

    const expoDeps = [
      { name: "expo" },
      { name: "@react-navigation/native-stack" },
      { name: "expo-status-bar" },
      { name: "react-native" },
      { name: "react-native-safe-area-context" },
      { name: "react-native-screens" },
      { name: "@types/react-native", isDevDep: true },
    ];

    return deps;
  },
  async scaffold(context) {
    const templates = [
      { src: "templates/.env.example.ejs", dest: ".env.example" },
      {
        src: "templates/docker-compose.yml.ejs",
        dest: "docker-compose.yml",
      },
    ];

    if (context.config.frameworks.includes("next")) {
      templates.push({ src: "templates/next", dest: "./" });
    }

    if (context.config.frameworks.includes("expo")) {
      templates.push({ src: "templates/expo", dest: "./" });
    }

    return templates;
  },
  async codemods(context) {
    const changes = [];

    if (context.config.frameworks.includes("next")) {
      const tsConfigPath = context.paths.tsConfig;
      const tsConfig = readJson(tsConfigPath);

      tsConfig.compilerOptions.baseUrl =
        tsConfig.compilerOptions.baseUrl || ".";
      tsConfig.compilerOptions.paths = {
        ...(tsConfig.compilerOptions.paths || {}),
        "@ui/*": ["./lib/core/ui/*"],
        "@api/*": ["./lib/core/api/*"],
        "@util/*": ["./lib/core/util/*"],
        "@lib/*": ["./lib/*"],
      };

      writeJson(tsConfigPath, tsConfig, { spaces: 2 });
      changes.push(tsConfigPath);
    }

    if (
      context.config.frameworks.includes("next") ||
      context.config.frameworks.includes("remix")
    ) {
      const packageJsonPath = context.paths.packageJson;
      const packageJson = readJson(packageJsonPath);

      packageJson.type = "commonjs";

      packageJson.prisma = {
        seed: "npx ts-node -T prisma/seed.ts",
      };

      packageJson.scripts = {
        ...packageJson.scripts,
        "docker:start": "docker-compose up -d",
        "docker:stop": "docker-compose down",
        "prisma:generate": "dotenv -- prisma generate",
        "prisma:migrate:dev": "dotenv -- prisma migrate dev",
        "prisma:migrate:prod": "dotenv -- prisma migrate deploy",
        "prisma:reset": "dotenv -- prisma migrate reset",
        "prisma:seed": "dotenv -- prisma db seed",
      };

      writeJson(packageJsonPath, packageJson, { spaces: 2 });
      changes.push(packageJsonPath);
    }

    const envContents = readFile(context.paths.envExample);
    writeFile(context.paths.env, envContents, {
      append: true,
    });

    return changes;
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
