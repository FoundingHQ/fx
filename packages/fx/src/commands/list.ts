import { chalk, getOfficialGeneratorList } from "@founding/devkit";

export async function list() {
  const featureList = await getOfficialGeneratorList();

  console.log(chalk.bold(`Available Features:`));
  console.log(`  ${featureList.map((f) => `- ${f}`).join("\n  ")}`);
  console.log();
  console.log(
    `You can add features to your fx app with ${chalk.cyan(`fx add <feature>`)}`
  );
  console.log();
}
