import chalk from "chalk";

export function remove(feature: string = "") {
  if (!feature) {
    console.log();
    console.log("Please specify the feature to remove:");
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("[feature]")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("auth")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`fx --help`)} to see all options.`);
    process.exit(1);
  }

  console.log(
    `${chalk.red(
      "Error"
    )}: Removing features has not been implemented yet. You can manually remove features with ${chalk.cyan(
      "rm -rf lib/<feature>"
    )} and uninstall libraries.`
  );
  // console.log(`Removing features: ${chalk.cyan(feature.join(", "))}`);
}
