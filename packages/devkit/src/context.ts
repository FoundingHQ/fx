import fs from "fs-extra";
import { resolve } from "path";
import { cwd } from "./config";

const inflection = require("inflection");
const changeCase = require("change-case");

const helpers = {
  pluralizedCamelCase: (s: string) =>
    changeCase.camelCase(inflection.pluralize(s)),
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  inflection,
  changeCase,
};

export type Frameworks = "next" | "expo";
export type Language = "typescript" | "javascript";
export type Theme = "skeleton";

export type Context<T = {}> = {
  props: T;
  paths: {
    root: string;
    config: string;
    packageJson: string;
    scheme: string;
    lib: string;
    libCore: string;
    mobile: string;
    appJson: string;
    pages: string;
    api: string;
  };
  config: {
    frameworks: Frameworks[];
    language: Language;
    theme: Theme;
  };
  h: typeof helpers;
};

export const createContext = () => {
  // Context is currently hardcoded but should be configurable with
  // `fx.config.js`
  const context: Context = {
    props: {},
    paths: {
      root: cwd,
      config: resolve(cwd, "fx.config.js"),
      packageJson: resolve(cwd, "package.json"),
      scheme: resolve(cwd, "prisma/schema.prisma"),
      lib: resolve(cwd, "lib"),
      libCore: resolve(cwd, "lib/core"),
      mobile: resolve(cwd, "expo"),
      appJson: resolve(cwd, "app.json"),
      pages: resolve(cwd, "pages"),
      api: resolve(cwd, "pages/api"),
    },
    config: {
      frameworks: getFrameworks(),
      language: getLanguage(),
      theme: "skeleton",
    },
    h: helpers,
  };

  return context;
};

export const getFrameworks = () => {
  const frameworks: Frameworks[] = [];
  const packageJson = fs.readJSONSync(resolve(cwd, "package.json"));
  if (packageJson["dependencies"]["next"]) frameworks.push("next");
  if (packageJson["dependencies"]["expo"]) frameworks.push("expo");
  return frameworks;
};

export const getLanguage = () => {
  const l: Language = fs.existsSync(resolve(cwd, "tsconfig.json"))
    ? "typescript"
    : "javascript";
  return l;
};

const interpolate = (path: string, obj: Record<string, any> = {}) => {
  const keys = Object.keys(obj);
  const func = Function(...keys, "return `" + path + "`;");
  return func(...keys.map((k) => obj[k]));
};

export const convertTemplateSrcPaths = (
  root: string,
  path: string,
  context: Context
) => {
  return resolve(root, interpolate(path, context));
};

export const convertTemplateDestPaths = (
  root: string,
  path: string,
  context: Context
) => {
  const dest = resolve(root, interpolate(path, context));
  if (dest.endsWith(".ejs") || dest.endsWith(".eta")) return dest.slice(0, -4);
  return dest;
};
