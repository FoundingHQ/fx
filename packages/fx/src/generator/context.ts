import {
  Context,
  Frameworks,
  Language,
  readJson,
  fileExists,
} from "@founding/devkit";
import { resolve } from "path";
import { cwd } from "../utils/config";

const inflection = require("inflection");
const changeCase = require("change-case");

const helpers = {
  pluralizedCamelCase: (s: string) =>
    changeCase.camelCase(inflection.pluralize(s)),
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  inflection,
  changeCase,
};

export const createContext = () => {
  // Context is currently hardcoded but should be configurable with
  // `fx.config.js`
  const context: Context = {
    props: {},
    paths: {
      root: cwd,
      env: resolve(cwd, ".env"),
      envExample: resolve(cwd, ".env.example"),
      fxConfig: resolve(cwd, "fx.config.js"),
      tsConfig: resolve(cwd, "tsconfig.json"),
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
  const packageJson = readJson(resolve(cwd, "package.json"));
  if (packageJson["dependencies"]["next"]) frameworks.push("next");
  if (packageJson["dependencies"]["expo"]) frameworks.push("expo");
  return frameworks;
};

export const getLanguage = () => {
  const l: Language = fileExists(resolve(cwd, "tsconfig.json"))
    ? "typescript"
    : "javascript";
  return l;
};

const interpolate = (path: string, obj: Record<string, any> = {}) => {
  const keys = Object.keys(obj);
  const func = Function(...keys, "return `" + path + "`;");
  return func(...keys.map((k) => obj[k]));
};

export const interpolatePath = (
  root: string,
  path: string,
  context: Context
) => {
  return resolve(root, interpolate(path, context));
};

export const removeTemplateExtension = (path: string) => {
  if (path.split(".").length > 2 && path.endsWith(".ejs"))
    return path.slice(0, -4);
  return path;
};