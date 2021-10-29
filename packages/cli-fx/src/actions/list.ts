import chalk from "chalk";
import { resolve } from "path";
import { getPaths } from "@founding/devkit";
import { config, featureGenerators } from "../config";

export async function list() {
  const featureList = Object.keys(featureGenerators);
  const presetPaths = await getPaths(
    resolve(config.cliRoot, "templates/presets/*.json")
  );

  console.log(chalk.bold(`Available Features:`));
  console.log(`  ${featureList.map((f) => `- ${f}`).join("\n  ")}`);
  console.log();
  console.log(
    `You can add features to your fx app with ${chalk.cyan(`fx add <feature>`)}`
  );
  console.log();
  console.log(chalk.bold(`Available Presets:`));
  console.log(
    `  ${presetPaths
      .map((path) => `- ${path.split("/").pop()?.replace(".json", "")}`)
      .join("\n  ")}`
  );
  console.log();
  console.log(
    `You can bootstrap a preset to your fx app with ${chalk.cyan(
      `fx bootstrap <preset>`
    )}`
  );
  console.log();
}
