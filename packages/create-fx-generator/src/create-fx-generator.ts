#!/usr/bin/env node
import { resolve } from "path";
import { Command } from "commander";
import { logger, checkAndNotifyUpdates } from "@founding/devkit";
import packageJson from "../package.json";

const program = new Command();

const main = async () => {
  program
    .version(packageJson.version)
    .arguments("[project-directory]")
    .usage(`${logger.withVariable("[project-directory]")} [options]`)
    .allowUnknownOption()
    .action(run);

  try {
    await program.parseAsync(process.argv);
    await checkAndNotifyUpdates(packageJson);
  } catch (reason: any) {
    logger.newLine();
    logger.log("Aborting installation.");
    if (reason.command) {
      logger.error(`  ${logger.withCommand(reason.command)} has failed.`);
    } else {
      logger.error("Unexpected error. Please report it as a bug:");
      logger.log(reason);
    }
    logger.newLine();
    await checkAndNotifyUpdates(packageJson);
    process.exit(1);
  }
};

const run = async (projectPath?: string) => {
  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    logger.newLine();
    logger.log("Please specify the project directory:");
    logger.log(
      `${logger.withCommand(program.name())} ${logger.withVariable(
        "[project-directory]"
      )}`,
      1,
      true
    );
    logger.log("For example:");
    logger.log(
      `${logger.withCommand(program.name())} ${logger.withVariable(
        "my-fx-app"
      )}`,
      1,
      true
    );
    logger.log(
      `Run ${logger.withCommand(
        `${program.name()} --help`
      )} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = resolve(projectPath);

  logger.log(
    `Converting your project at ${resolvedProjectPath} to a FX generator...`
  );
};

main();
