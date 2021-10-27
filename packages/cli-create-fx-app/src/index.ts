#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
import chalk from "chalk";
import Commander from "commander";
import path from "path";
import prompts from "prompts";
import checkForUpdate from "update-check";
import { validateNpmName } from "@founding/devkit";
import { createApp, DownloadError } from "./create-app";
import packageJson from "../package.json";

let projectPath: string = "";

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name) => {
    projectPath = name;
  })
  .option(
    "-p, --preset [name]|[github-url]",
    `

    Presets act as sharable set of feature configurations. You may want to
    bootstrap your application as an Ecommerce app, or a Marketplace app;
    presets allow you to do that by cloning the root-template and scaffolding
    a set of preconfigured features.

    You can use an example name from the Fx repo or a GitHub URL. The URL can
    use any branch and/or subdirectory.
`
  )
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<void> {
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
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) return true;
        return `Invalid project name: ${validation.problems![0]}`;
      },
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log();
    console.log("Please specify the project directory:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
    );
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("my-fx-app")}`);
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    problems!.forEach((p) => console.error(`    ${chalk.red.bold("*")} ${p}`));
    process.exit(1);
  }

  if (program.preset === true) {
    console.error(
      "Please provide an preset name, otherwise remove the preset option."
    );
    process.exit(1);
  }

  const preset = typeof program.preset === "string" && program.preset.trim();

  await createApp({
    appPath: resolvedProjectPath,
    preset: preset && preset !== "default" ? preset : undefined,
  });
}

const update = checkForUpdate(packageJson).catch(() => null);

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      console.log();
      console.log(
        chalk.yellow.bold("A new version of `create-fx-app` is available!")
      );
      console.log(
        `You can update by running: ${chalk.cyan("npm i -g create-fx-app")}`
      );
      console.log();
    }
    process.exit();
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(reason);
    }
    console.log();

    await notifyUpdate();

    process.exit(1);
  });
