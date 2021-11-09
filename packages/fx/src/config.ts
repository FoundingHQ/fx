import { cwd } from "process";
import { resolve } from "path";
import { Generator } from "./types";

// Import your feature generators:
import authGenerator from "./generators/auth/authGenerator";
import paymentsGenerator from "./generators/payments/paymentsGenerator";
import resourceGenerator from "./generators/resource/resourceGenerator";

// Export it for use in the CLI:
export const featureGenerators = {
  // { Feature name: generator module }
  auth: authGenerator,
  payments: paymentsGenerator,
  resource: resourceGenerator,
} as Record<string, Generator>;

export const config = {
  cliRoot: resolve(__dirname, "../"),
  projectRoot: cwd(),
};

export const convertTemplatePaths = (path = { src: "", dest: "" }) => ({
  ...path,
  src: resolve(config.cliRoot, path.src),
  dest: resolve(config.projectRoot, path.dest),
});

const filetypeToParser = {
  ts: "typescript",
  tsx: "typescript",
  js: "babel",
  jsx: "babel",
  json: "json",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  html: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",
  graphql: "graphql",
};

export const getPrettierParser = (filePath: string) => {
  const filetype = filePath.slice(filePath.lastIndexOf(".") + 1);
  return filetypeToParser[filetype as keyof typeof filetypeToParser] || null;
};

const interpolate = (template: string, obj: Record<string, any> = {}) => {
  const keys = Object.keys(obj);
  const func = Function(...keys, "return `" + template + "`;");
  return func(...keys.map((k) => obj[k]));
};

export const convertAndInterpolateTemplatePaths = (
  template: string,
  context: Record<string, any> = {}
) => {
  return resolve(config.cliRoot, interpolate(template, context));
};
