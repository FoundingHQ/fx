#!/usr/bin/env node
import { resolve, basename } from "path";
import { Command } from "commander";
import {
  logger,
  prompts,
  validateNpmName,
  checkAndNotifyUpdates,
} from "@founding/devkit";
import { scaffold } from "./scaffold";
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
    const res = await prompts({
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-app",
      validate: (name) => {
        const validation = validateNpmName(basename(resolve(name)));
        if (validation.valid) return true;
        return `Invalid project name: ${validation.problems![0]}`;
      },
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
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
  const projectName = basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);
  if (!valid) {
    logger.error(
      `Could not create a project called "${projectName}" because of npm naming restrictions:`
    );
    logger.list(
      problems?.map((problem: string) => logger.withError(problem)) || []
    );
    process.exit(1);
  }

  await scaffold({
    appPath: resolvedProjectPath,
  });
};

main();
