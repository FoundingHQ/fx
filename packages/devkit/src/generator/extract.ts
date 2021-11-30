import fs from "fs-extra";
import { join, resolve, dirname } from "path";
import chalk from "chalk";
import { Generator, GeneratorMeta, GeneratorLocation } from "./types";
import { setupTsTranspiler } from "../ts-transpiler";
import { gotJSON, isUrlValid } from "../network";
import { GH_ROOT, API_ROOT, RAW_ROOT, cwd } from "../config";
import { install } from "../package";
import { cloneRepo } from "../repo";

export const normalizeGeneratorPath = (feature: string) => {
  // feature == `auth`
  const isOfficialGenerator = /^([\w\-_]*)$/.test(feature);
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

const requireJSON = (file: string) => {
  return JSON.parse(fs.readFileSync(file).toString("utf-8"));
};

export const extractGenerator = async (generatorInfo: GeneratorMeta) => {
  // Since the generator may be a .ts file, we need to setup a tsnode runtime
  setupTsTranspiler();

  if (generatorInfo.location === GeneratorLocation.Remote) {
    const apiUrl = generatorInfo.path.replace(GH_ROOT, API_ROOT);
    const rawUrl = generatorInfo.path.replace(GH_ROOT, RAW_ROOT);
    const repoInfo = await gotJSON(apiUrl);
    const packageJsonPath = join(
      `${rawUrl}`,
      repoInfo.default_branch,
      generatorInfo.subdirectory ?? "",
      "package.json"
    );

    if (!(await isUrlValid(packageJsonPath))) {
      console.error(
        `Could not find generator for "${generatorInfo.feature}"\n`
      );
      console.log(`${chalk.bold("Please provide one of the following:")}
1. The name of a feature to install (e.g. "auth")
 ${chalk.dim(
   "- Available generators listed at https://github.com/foundinghq/fx/tree/main/generators"
 )}
2. The full name of a GitHub repository (e.g. "foundinghq/example-generator"),
3. A full URL to a Github repository (e.g. "https://github.com/foundinghq/example-generator"), or
4. A file path to a locally-written generator.\n`);
      process.exit(1);
    } else {
      const tempDir = generatorInfo.localRootPath;

      await cloneRepo(
        tempDir,
        repoInfo.full_name,
        repoInfo.default_branch,
        generatorInfo.subdirectory
      );

      const generatorPackageJson = requireJSON(
        generatorInfo.localPackageJsonPath
      );

      if (!generatorPackageJson.main) {
        console.error(
          `Generator package.json must have a "main" field that points to the generator`
        );
        process.exit(1);
      }

      // Since the generator lives inside the project subdirectory (.fx folder),
      // we only need to install dependencies that the project doesnt have.
      if (
        generatorPackageJson.dependencies ||
        generatorPackageJson.devDependencies
      ) {
        const projectPackageJson = requireJSON(join(cwd, "package.json"));
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
    const generatorEntry = resolve(cwd, generatorInfo.path);
    const generator: Generator = require(generatorEntry).default;

    return { generator, packageJson: {} };
  }
};
