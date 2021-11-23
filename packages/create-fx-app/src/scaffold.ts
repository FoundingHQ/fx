import retry from "async-retry";
import path from "path";
import {
  chalk,
  cloneRepo,
  makeDir,
  install,
  isFolderEmpty,
  isWriteable,
} from "@founding/devkit";
import { tryGitInit } from "./util/git";

export async function scaffold({
  appPath,
  skipInstall,
}: {
  appPath: string;
  skipInstall?: boolean;
}): Promise<void> {
  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  console.log(`Creating a new FX app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);

  try {
    console.log(`Downloading template files. This might take a moment.`);
    console.log();
    await retry(() => cloneRepo(root), {
      retries: 3,
    });
  } catch (reason) {
    console.error(reason);
    throw new Error();
  }

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  if (!skipInstall) {
    console.log("Installing packages. This might take a couple of minutes.");
    console.log();
    try {
      await install(root, null);
      console.log();
    } catch (error) {
      console.log();
    }
  }

  let cdpath: string;
  if (path.join(process.cwd(), appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  npm run docker:start`));
  console.log(
    "    Starts a docker instance containing your database and other third party software."
  );
  console.log();
  console.log(chalk.cyan(`  npm run prisma:migrate:dev`));
  console.log("    Runs your database migrations.");
  console.log();
  console.log(chalk.cyan(`  npm run dev`));
  console.log("    Starts the development server.");
  console.log();
  console.log(chalk.cyan(`  npm run fx:add`));
  console.log("    Scaffold prebuilt features.");
  console.log();
  console.log("You can begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdpath);
  console.log(`  ${chalk.cyan(`npm run docker:start`)}`);
  console.log(`  ${chalk.cyan(`npm run prisma:migrate:dev`)}`);
  console.log(`  ${chalk.cyan(`npm run dev`)}`);
  console.log();
}
