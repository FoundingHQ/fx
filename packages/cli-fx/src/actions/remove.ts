import chalk from "chalk";

export function remove(featureList: string[] = []) {
  if (featureList.length === 0) {
    console.log();
    console.log("Please specify the feature to remove:");
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("[feature...]")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("auth")}`);
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("auth payments")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`fx --help`)} to see all options.`);
    process.exit(1);
  }

  console.log(`Removing features: ${featureList.join(", ")}`);
}
