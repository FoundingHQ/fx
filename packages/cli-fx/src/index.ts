#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { checkAndNotifyUpdates } from "@founding/devkit";
import packageJson from "../package.json";

const program = new Command();

async function main() {
  program
    .version(packageJson.version)
    .description(
      "CLI tool to add/remove prebuilt features inside to a Fx project"
    )
    .command("add [feature]", "add a new feature to the project")
    .alias("a")
    .command("remove [feature]", "remove a feature from the project")
    .alias("rm")
    .command("list", "list all available features and presets", {
      isDefault: true,
    })
    .command("bootstrap [preset]", "bootstrap a new project with a preset")
    .alias("b");

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
