import checkForUpdate from "update-check";
import { logger } from "./logger";

export const checkAndNotifyUpdates = async (
  packageJson: Record<string, any>
) => {
  try {
    const res = await checkForUpdate(packageJson).catch(() => null);
    if (res?.latest) {
      logger.newLine();
      logger.warning(`A new version of "${packageJson.name}" is available!`);
      logger.log(
        `You can update by running: ${logger.withVariable(
          `npm update ${packageJson.name}`
        )}`
      );
      logger.newLine();
    }
    process.exit();
  } catch {
    // ignore error
  }
};
