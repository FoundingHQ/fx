import { join, resolve, dirname } from "path";
import {
  Generator,
  GeneratorMeta,
  GeneratorLocation,
  logger,
  readJson,
} from "@founding/devkit";
import { setupTsTranspiler } from "../utils/ts-transpiler";
import { gotJSON, isUrlValid } from "../utils/network";
import { GH_ROOT, API_ROOT, RAW_ROOT, cwd } from "../utils/config";
import { cloneRepo } from "../utils/repo";
import { install } from "../utils/package";

export const normalizeGeneratorPath = (feature: string) => {
  // feature == `auth`
  const isOfficialGenerator = /^([\w\-_\[\]]*)$/.test(feature);
  // feature == `https://github.com/some-githubuser/my-awesome-generator`
  const isUrlGenerator = feature.startsWith(GH_ROOT);
  // feature == `some-githubuser/my-awesome-generator`
  const isGitHubShorthandGenerator = /^([\w-_]*)\/([\w-_]*)$/.test(feature);
  if (isOfficialGenerator || isUrlGenerator || isGitHubShorthandGenerator) {
    let repoUrl;
    let subdirectory;
    switch (true) {
      case isUrlGenerator:
        repoUrl = feature;
        break;
      case isOfficialGenerator:
        repoUrl = `${GH_ROOT}/foundinghq/fx`;
        subdirectory = `generators/${feature}`;
        break;
      case isGitHubShorthandGenerator:
        repoUrl = `${GH_ROOT}/${feature}`;
        break;
      default:
        throw new Error(
          "should be impossible, the 3 cases are the only way to get into this switch"
        );
    }
    return {
      feature,
      path: repoUrl,
      subdirectory,
      localRootPath: join(cwd, ".fx"),
      localPackageJsonPath: join(cwd, ".fx", "package.json"),
      location: GeneratorLocation.Remote,
    };
  } else {
    // feature == `./my-awesome-generator.ts`
    return {
      feature,
      path: feature,
      localRootPath:
        feature.endsWith(".ts") || feature.endsWith(".js")
          ? dirname(feature)
          : feature,
      localPackageJsonPath: join(dirname(feature), "package.json"),
      location: GeneratorLocation.Local,
    };
  }
};

const skipDependencies: Record<string, boolean> = {
  "@founding/devkit": true,
};

export const extractGenerator = async (generatorMeta: GeneratorMeta) => {
  // Since the generator may be a .ts file, we need to setup a tsnode runtime
  setupTsTranspiler();

  if (generatorMeta.location === GeneratorLocation.Remote) {
    const apiUrl = generatorMeta.path.replace(GH_ROOT, API_ROOT);
    const rawUrl = generatorMeta.path.replace(GH_ROOT, RAW_ROOT);
    const repoInfo = await gotJSON(apiUrl);
    const packageJsonPath = join(
      `${rawUrl}`,
      repoInfo.default_branch,
      generatorMeta.subdirectory ?? "",
      "package.json"
    );

    if (!(await isUrlValid(packageJsonPath))) {
      logger.error(`Could not find generator for "${generatorMeta.feature}"\n`);
      logger.title("Please provide one of the following:");
      logger.log(`1. The name of a feature to install (e.g. "auth")`);
      logger.meta(
        "- Available generators listed at https://github.com/foundinghq/fx/tree/main/generators"
      );
      logger.log(
        `2. The full name of a GitHub repository (e.g. "foundinghq/example-generator")`
      );
      logger.log(
        `3. A full URL to a Github repository (e.g. "https://github.com/foundinghq/example-generator"), or`
      );
      logger.log(`4. A file path to a locally-written generator.`, 0, true);
      process.exit(1);
    } else {
      const tempDir = generatorMeta.localRootPath;

      await cloneRepo(
        tempDir,
        repoInfo.full_name,
        repoInfo.default_branch,
        generatorMeta.subdirectory
      );

      const generatorPackageJson = readJson(generatorMeta.localPackageJsonPath);

      if (!generatorPackageJson.main) {
        logger.error(
          `Failed to run generator: package.json must have a "main" field that points to the generator module`
        );
        process.exit(1);
      }

      // Since the generator lives inside the project subdirectory (.fx folder),
      // we only need to install dependencies that the project doesnt have.
      if (
        generatorPackageJson.dependencies ||
        generatorPackageJson.devDependencies
      ) {
        const projectPackageJson = readJson(join(cwd, "package.json"));
        const allProjectDependencies = [
          ...Object.keys(projectPackageJson.dependencies || {}),
          ...Object.keys(projectPackageJson.devDependencies || {}),
        ];

        const allGeneratorDependencies = [
          ...Object.keys(generatorPackageJson.dependencies || {}),
          ...Object.keys(generatorPackageJson.devDependencies || {}),
        ];

        const difference = allGeneratorDependencies
          .filter((d) => !skipDependencies[d])
          .filter((d) => !allProjectDependencies.includes(d));

        if (difference.length > 0) {
          await install(
            tempDir,
            difference.map((d) => ({ name: d })),
            false
          );
        }
      }

      const generatorEntry = resolve(tempDir, generatorPackageJson.main);
      const generator: Generator = require(generatorEntry).default;

      return { generator, packageJson: generatorPackageJson };
    }
  } else {
    const generatorEntry = resolve(cwd, generatorMeta.path);
    const generator: Generator = require(generatorEntry).default;

    return { generator, packageJson: {} };
  }
};
