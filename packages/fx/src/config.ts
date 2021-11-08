import { cwd } from "process";
import { resolve } from "path";
import { Generator } from "./types";

// Import your feature generators:
import authGenerator from "./generators/auth/authGenerator";
import paymentsGenerator from "./generators/payments/paymentsGenerator";

// Export it for use in the CLI:
export const featureGenerators = {
  // { Feature name: generator module }
  auth: authGenerator,
  payments: paymentsGenerator,
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
