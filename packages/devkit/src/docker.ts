import { execSync } from "child_process";

export const startDocker = () => {
  console.log("Starting docker instance");
  execSync("npm run docker:start", { stdio: "inherit" });
};

export const stopDocker = () => {
  console.log("Stopping docker instance");
  execSync("npm run docker:stop", { stdio: "inherit" });
};
