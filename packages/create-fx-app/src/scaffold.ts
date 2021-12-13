import { resolve, dirname, basename } from "path";
import validateProjectName from "validate-npm-package-name";
import { logger, exec, isWriteable } from "@founding/devkit";

export const scaffold = async ({ appPath }: { appPath: string }) => {
  const root = resolve(appPath);
  const appName = basename(root);

  if (!(await isWriteable(dirname(root)))) {
    logger.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    process.exit(1);
  }

  // Run `create-next-app`
  await exec("npx", ["create-next-app@latest", appName, "--ts", "--use-npm"]);

  // Run `fx` commands
  logger.log(
    `Adding FX into ${logger.withVariable(appName)} project:`,
    0,
    true
  );
  process.chdir(appName);
  await exec("npm", ["i", "@founding/fx", "-D"]);
  await exec("npx", ["fx", "init"]);

  logger.success(
    `${logger.withVariable("Success!")} Created ${appName} at ${appPath}`
  );
  logger.newLine();
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
