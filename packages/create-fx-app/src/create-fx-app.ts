#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { Command } from "commander";
import chalk from "chalk";
import prompts from "prompts";
import { validateNpmName, checkAndNotifyUpdates } from "@founding/devkit";
import { scaffold } from "./scaffold";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

const program = new Command();

async function main() {
  program
    .version(packageJson.version)
    .arguments("[project-directory]")
    .usage(`${chalk.green("[project-directory]")} [options]`)
    .option(
      "-p, --preset [name]|[github-url]",
      `

      Presets act as sharable set of feature configurations. You may want to
      bootstrap your application as an Ecommerce app, or a Marketplace app;
      presets allow you to do that by cloning the template and scaffolding
      a set of preconfigured features.

      You can use an example name from the Fx repo or a GitHub URL. The URL can
      use any branch and/or subdirectory.
  `
    )
    .option("--noinstall", "Skip installing dependencies")
    .allowUnknownOption()
    .action(run);

  try {
    await program.parseAsync(process.argv);
    await checkAndNotifyUpdates(packageJson);
  } catch (reason: any) {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(reason);
    }
    console.log();

    await checkAndNotifyUpdates(packageJson);

    process.exit(1);
  }
}

async function run(
  projectPath?: string,
  options: Record<string, string | boolean> = {}
): Promise<void> {
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
      `  ${chalk.cyan(program.name())} ${chalk.green("[project-directory]")}`
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

  if (options.preset === true) {
    console.error(
      "Please provide an preset name, otherwise remove the preset option."
    );
    process.exit(1);
  }

  const preset = typeof options.preset === "string" && options.preset.trim();

  await scaffold({
    appPath: resolvedProjectPath,
    preset: preset || undefined,
    shouldNpmInstall: !options.noinstall,
  });
}

main();
