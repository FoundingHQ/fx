#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { checkAndNotifyUpdates } from "@founding/devkit";
import { list } from "./actions/list";
import { add } from "./actions/add";
import { remove } from "./actions/remove";
import { bootstrap } from "./actions/bootstrap";
import packageJson from "../package.json";

const program = new Command();

const parseJsonOptions = (command: string) => (val: string) => {
  try {
    return JSON.parse(val);
  } catch (e) {
    throw {
      command,
      message: "Invalid JSON options",
    };
  }
};

async function main() {
  program
    .version(packageJson.version)
    .description("CLI tool to add/remove prebuilt features to a Fx project");

  program
    .command("list")
    .description("list all available features and presets")
    .action(list)
    .allowUnknownOption();

  program
    .command("add [feature]")
    .description("add a new feature to the project")
    .option(
      "-o, --options <options>",
      "additional feature configurations in JSON form",
      parseJsonOptions("add")
    )
    .option(
      "-n, --dryrun",
      "print outputs of adding a feature without running the installations"
    )
    .action(add)
    .allowUnknownOption();

  program
    .command("remove [feature]")
    .description("remove a feature from the project")
    .option(
      "-n, --dryrun",
      "print outputs of removing a feature without running the installations"
    )
    .action(remove)
    .allowUnknownOption();

  program
    .command("bootstrap [preset]")
    .description("bootstrap a new project with a preset")
    .option(
      "-n, --dryrun",
      "print outputs of bootstrapping a project without running the installations"
    )
    .action(bootstrap)
    .allowUnknownOption();

  try {
    await program.parseAsync(process.argv);
    await checkAndNotifyUpdates(packageJson);
  } catch (reason: any) {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} command failed.`);
      if (reason.message) {
        console.log();
        console.log(`${chalk.red(reason.message)}`);
      }
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(reason);
    }
    console.log();

    await checkAndNotifyUpdates(packageJson);

    process.exit(1);
  }
}

main();
