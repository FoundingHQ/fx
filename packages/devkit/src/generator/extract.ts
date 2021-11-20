import { readFileSync } from "fs-extra";
import { join, resolve, dirname } from "path";
import chalk from "chalk";
import { Generator } from "./types";
import { setupTsnode } from "../tsnode";
import { gotJSON, isUrlValid } from "../network";
import { GH_ROOT, API_ROOT, RAW_ROOT, FX_PROJECT_PATHS, cwd } from "../config";
import { install } from "../package";
import { cloneRepo } from "../repo";

export enum GeneratorLocation {
  Local,
  Remote,
}

type GeneratorMeta = {
  feature: string;
  path: string;
  subdirectory?: string;
  location: GeneratorLocation;
};

export function normalizeGeneratorPath(feature: string): GeneratorMeta {
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
      location: GeneratorLocation.Remote,
    };
  } else {
    // feature == `./my-awesome-generator.ts`
    return {
      feature,
      path: feature,
      location: GeneratorLocation.Local,
    };
  }
}

const requireJSON = (file: string) => {
  return JSON.parse(readFileSync(file).toString("utf-8"));
};

export async function extractGenerator(generatorInfo: GeneratorMeta) {
  // Since the generator may be a .ts file, we need to setup a tsnode runtime
  setupTsnode();

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
      const tempDir = FX_PROJECT_PATHS.generatorRoot;

      await cloneRepo(
        tempDir,
        repoInfo.full_name,
        repoInfo.default_branch,
        generatorInfo.subdirectory
      );

      await install(tempDir, null);

      const packageJson = requireJSON(
        FX_PROJECT_PATHS.generatorPackageJson
      ).main;

      if (!packageJson.main) {
        console.error(
          `Generator package.json must have a "main" field that points to the generator`
        );
        process.exit(1);
      }

      const generatorEntry = resolve(tempDir, packageJson.main);
      return {
        generator: require(generatorEntry).default as Generator,
        packageJson,
      };
    }
  } else {
    const generatorEntry = resolve(cwd, generatorInfo.path);
    FX_PROJECT_PATHS.generatorRoot = dirname(generatorEntry);
    return {
      generator: require(generatorEntry).default as Generator,
      packageJson: {},
    };
  }
}
