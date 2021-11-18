import { execSync } from "child_process";

export const runMigrations = (name?: string) => {
  console.log("Running migrations on local");
  execSync(`npm run prisma:migrate:dev -- --skip-seed --name ${name || ""}`, {
    stdio: "inherit",
  });
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
