import { resolve, dirname, basename } from "path";
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

  logger.log(`Creating a new FX project in ${logger.withVariable(root)}.`, 0);
  await exec("npx", ["create-next-app@latest", appName, "--ts", "--use-npm"]);

  process.chdir(appName);
  console.log(`Adding FX into ${appName} project:`);
  await exec("npm", ["i", "@founding/fx", "-D"]);
  await exec("npx", ["fx", "init"]);

  logger.success(
    `${logger.withVariable("Success!")} Created ${appName} at ${appPath}`
  );
  logger.newLine();
};
