import { logger, getOfficialGeneratorList } from "@founding/devkit";

export const list = async () => {
  const spinner = logger.spinner(`Loading feature list`);
  const featureList = await getOfficialGeneratorList();
  spinner.stop();
  logger.log(`Available FX features:`);
  logger.log(featureList.map((f) => logger.withCaret(f)).join("\n"));
  logger.newLine();
  logger.log(`You can add features to your project with:`);
  logger.log(logger.withCommand(`npx fx add <feature>`), 1);
  logger.newLine();
};
