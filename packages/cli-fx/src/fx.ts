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

async function main() {
  program
    .version(packageJson.version)
    .description("CLI tool to add/remove prebuilt features to a Fx project");

  program
    .command("list")
    .description("list all available features and presets")
    .action(list);

  program
    .command("add [feature]")
    .description("add a new feature to the project")
    .action(add);

  program
    .command("remove [feature]")
    .description("remove a feature from the project")
    .action(remove);

  program
    .command("bootstrap [preset]")
    .description("bootstrap a new project with a preset")
    .action(bootstrap);

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

main();
