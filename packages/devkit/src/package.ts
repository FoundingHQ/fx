import { execSync } from "child_process";
import spawn from "cross-spawn";
import validateProjectName from "validate-npm-package-name";
import chalk from "chalk";
import checkForUpdate from "update-check";

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
      await runCommand(command, args, withStdio);
    }

    if (devDeps.length) {
      command = useYarn ? "yarnpkg" : "npm";
      args = useYarn
        ? ["add", "--exact", "--cwd", root, ...devDeps]
        : ["install", "--save-exact", "--save-dev", ...devDeps];
      await runCommand(command, args, withStdio);
    }

    if (expoDeps.length) {
      command = "expo";
      args = ["install", ...expoDeps];
      await runCommand(command, args, withStdio);
    }
  } else {
    command = useYarn ? "yarnpkg" : "npm";
    args = useYarn ? [] : ["install"];
    await runCommand(command, args, withStdio);
  }

  process.chdir(originalCwd);
};

const runCommand = (
  command: string,
  args: string[],
  withStdio: boolean = true
) =>
  new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: withStdio ? "inherit" : "ignore",
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });

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
    if (userAgent) {
      return Boolean(userAgent && userAgent.startsWith("yarn"));
    }
    execSync("yarnpkg --version", { stdio: "ignore" });
    return true;
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
      console.log();
      console.log(
        chalk.yellow.bold(
          `A new version of "${packageJson.name}" is available!`
        )
      );
      console.log(
        `You can update by running: ${chalk.cyan(
          `npm update ${packageJson.name}`
        )}`
      );
      console.log();
    }
    process.exit();
  } catch {
    // ignore error
  }
};
