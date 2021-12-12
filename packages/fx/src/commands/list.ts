import { logger } from "@founding/devkit";
import { getOfficialGeneratorList } from "../generator/list";

export const list = async () => {
  const spinner = logger.spinner(`Loading feature list`);
  const featureList = await getOfficialGeneratorList();
  spinner.stop();
  logger.title(`Available FX features:`);
  logger.list(featureList);
  logger.newLine();
  logger.log(`You can add features to your project with:`);
  logger.log(logger.withCommand(`npx fx add <feature>`), 1);
  logger.newLine();
};
