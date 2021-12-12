import validateProjectName from "validate-npm-package-name";
import checkForUpdate from "update-check";
import { exec, execSync } from "./exec";
import { logger } from "./logger";

export type Package = {
  name: string;
  version?: string;
  isDevDep?: boolean;
  isExpoDep?: boolean;
};

const mapPackage = (p: Package) => {
  if (!p.version) return p.name;
  return `${p.name}@${p.version}`;
};

export const install = async (
  root: string,
  dependencies: Package[] | null,
  withStdio: boolean = true
) => {
  const originalCwd = process.cwd();
  const useYarn = shouldUseYarn();
  let command: string;
  let args: string[];

  process.chdir(root);

  if (dependencies && dependencies.length) {
    const deps = dependencies
      .filter((p) => !p.isDevDep && !p.isExpoDep)
      .map(mapPackage);
    const devDeps = dependencies.filter((p) => p.isDevDep).map(mapPackage);
    const expoDeps = dependencies.filter((p) => p.isExpoDep).map(mapPackage);

    if (deps.length) {
      command = useYarn ? "yarnpkg" : "npm";
      args = useYarn
        ? ["add", "--exact", "--cwd", root, ...deps]
        : ["install", "--save-exact", "--save", ...deps];
      await exec(command, args, withStdio);
    }

    if (devDeps.length) {
      command = useYarn ? "yarnpkg" : "npm";
      args = useYarn
        ? ["add", "--exact", "--cwd", root, ...devDeps]
        : ["install", "--save-exact", "--save-dev", ...devDeps];
      await exec(command, args, withStdio);
    }

    if (expoDeps.length) {
      command = "expo";
      args = ["install", ...expoDeps];
      await exec(command, args, withStdio);
    }
  } else {
    command = useYarn ? "yarnpkg" : "npm";
    args = useYarn ? [] : ["install"];
    await exec(command, args, withStdio);
  }

  process.chdir(originalCwd);
};

export const uninstall = async (
  root: string,
  dependencies: string[],
  withStdio: boolean = true
) => {
  const originalCwd = process.cwd();
  const useYarn = shouldUseYarn();
  const command = useYarn ? "yarnpkg" : "npm";
  const args = useYarn
    ? ["remove", "--cwd", root, ...dependencies]
    : ["uninstall", ...dependencies];

  process.chdir(root);
  await exec(command, args, withStdio);
  process.chdir(originalCwd);
};

export const validateNpmName = (name: string) => {
  const nameValidation = validateProjectName(name);
  if (nameValidation.validForNewPackages) {
    return { valid: true };
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
  };
};

export const shouldUseYarn = () => {
  try {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) return Boolean(userAgent && userAgent.startsWith("yarn"));
    if (execSync("yarn", ["--version"]).status === 0) return true;
    return false;
  } catch (e) {
    return false;
  }
};

export const checkAndNotifyUpdates = async (
  packageJson: Record<string, any>
) => {
  try {
    const res = await checkForUpdate(packageJson).catch(() => null);
    if (res?.latest) {
      logger.newLine();
      logger.warning(`A new version of "${packageJson.name}" is available!`);
      logger.log(
        `You can update by running: ${logger.withVariable(
          `npm update ${packageJson.name}`
        )}`
      );
      logger.newLine();
    }
    process.exit();
  } catch {
    // ignore error
  }
};
