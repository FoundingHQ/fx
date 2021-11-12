import { execSync } from "child_process";

export const startDocker = () => {
  console.log("Starting docker instance");
  execSync("npm run docker:start");
};

export const stopDocker = () => {
  console.log("Stopping docker instance");
  execSync("npm run docker:stop");
};
