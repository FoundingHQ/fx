import retry from "async-retry";
import chalk from "chalk";
import path from "path";
import {
  downloadAndExtractRepo,
  makeDir,
  tryGitInit,
  install,
  isFolderEmpty,
  getOnline,
  isWriteable,
} from "@founding/devkit";

export class DownloadError extends Error {}

export async function scaffold({
  appPath,
  preset,
}: {
  appPath: string;
  preset?: string;
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

  const isOnline = await getOnline();
  const originalDirectory = process.cwd();

  console.log(`Creating a new Founding app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  try {
    console.log(`Downloading template files. This might take a moment.`);
    console.log();
    await retry(() => downloadAndExtractRepo(root), {
      retries: 3,
    });
  } catch (reason) {
    console.log(reason);
    function isErrorLike(err: unknown): err is { message: string } {
      return (
        typeof err === "object" &&
        err !== null &&
        typeof (err as { message?: unknown }).message === "string"
      );
    }
    throw new DownloadError(isErrorLike(reason) ? reason.message : reason + "");
  }

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  console.log("Installing packages. This might take a couple of minutes.");
  console.log();

  try {
    await install(root, null, { isOnline });
    console.log();
  } catch (error) {
    console.log();
  }

  if (preset) {
    console.log("Bootstrapping your preset...");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
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
  console.log(chalk.cyan(`  npm run prisma:migrate`));
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
  console.log(`  ${chalk.cyan(`npm run prisma:migrate`)}`);
  console.log(`  ${chalk.cyan(`npm run dev`)}`);
  console.log();
}
