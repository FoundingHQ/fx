import { exec, sleep } from "../utils/exec";
import { logger } from "../utils/logger";

export const startDocker = async () => {
  console.log("Starting docker instance");
  await exec("docker-compose", ["up", "-d"]);
};

export const stopDocker = async () => {
  console.log("Stopping docker instance");
  await exec("docker-compose", ["down"]);
};

export const runMigrations = async (name = "") => {
  console.log("Running local migrations");
  await exec("npm", [
    "run",
    "prisma:migrate:dev",
    "--",
    "-n",
    name,
    "--skip-seed",
  ]);
};

export const runPrismaCodegen = async () => {
  console.log("Running prisma codegen");
  await exec("npm", ["run", "prisma:generate"]);
};

export const syncGeneratorMigrations = async (migrationName: string) => {
  try {
    await startDocker();
    await sleep(2000);
    await runMigrations(migrationName);
  } catch (error: any) {
    logger.error(`Failed to run migrations: ${error.command}`);
    logger.newLine();
    logger.warning(
      "You can manually run migrations with the following commands:"
    );
    logger.list([
      `npm run docker:start - ${logger.withMeta(
        "starts a local docker instance with your database"
      )}`,
      `npm run prisma:migrate:dev - ${logger.withMeta("runs db migrations")}`,
    ]);
    logger.newLine();
  }
};
