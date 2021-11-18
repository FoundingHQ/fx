import { cwd } from "process";
import { resolve } from "path";
import { Generator } from "@founding/devkit";

// Import your feature generators:
import authGenerator from "./generators/auth/authGenerator";
import paymentsGenerator from "./generators/payments/paymentsGenerator";
import resourceGenerator from "./generators/resource/resourceGenerator";

// Export it for use in the CLI:
export const featureGenerators: Record<string, Generator> = {
  // { Feature name: generator module }
  auth: authGenerator,
  payments: paymentsGenerator,
  resource: resourceGenerator,
};

export const config = {
  cliRoot: resolve(__dirname, "../"),
  projectRoot: cwd(),
};

export const getProjectPath = (path: string) => {
  return resolve(config.projectRoot, path);
};

export const getCliPath = (path: string) => {
  return resolve(config.cliRoot, path);
};

const interpolate = (path: string, obj: Record<string, any> = {}) => {
  const keys = Object.keys(obj);
  const func = Function(...keys, "return `" + path + "`;");
  return func(...keys.map((k) => obj[k]));
};

export const convertTemplateSrcPaths = (
  path: string,
  context: Record<string, any> = {}
) => {
  return resolve(config.cliRoot, interpolate(path, context));
};

export const convertTemplateDestPaths = (
  path: string,
  context: Record<string, any> = {}
) => {
  return resolve(config.projectRoot, interpolate(path, context));
};
