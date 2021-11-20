import * as changeCase from "change-case";
import {
  indexOf,
  pluralize,
  singularize,
  inflect,
  camelize,
  underscore,
  humanize,
  capitalize,
  dasherize,
  titleize,
  demodulize,
  tableize,
  classify,
  foreign_key,
  ordinalize,
  transform,
} from "inflection";
import fs from "fs-extra";
import { resolve } from "path";
import { cwd } from "./config";

const helpers = {
  pluralizedCamelCase: (s: string) => changeCase.camelCase(pluralize(s)),
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  inflection: {
    indexOf,
    pluralize,
    singularize,
    inflect,
    camelize,
    underscore,
    humanize,
    capitalize,
    dasherize,
    titleize,
    demodulize,
    tableize,
    classify,
    foreign_key,
    ordinalize,
    transform,
  },
  changeCase,
};

type Platforms = "web" | "mobile";
type Language = "typescript" | "javascript";
type Theme = "skeleton";

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
    pages: string;
    api: string;
  };
  config: {
    platforms: Platforms[];
    language: Language;
    theme: Theme;
  };
  h: typeof helpers;
};

export const buildContext = (props: any) => {
  // Context is currently hardcoded but should be configurable with
  // `fxconfig.json`
  const context: Context = {
    props,
    paths: {
      root: cwd,
      config: resolve(cwd, "fxconfig.json"),
      packageJson: resolve(cwd, "package.json"),
      scheme: resolve(cwd, "prisma/schema.prisma"),
      lib: resolve(cwd, "lib"),
      libCore: resolve(cwd, "lib/core"),
      mobile: resolve(cwd, "expo"),
      pages: resolve(cwd, "pages"),
      api: resolve(cwd, "pages/api"),
    },
    config: {
      platforms: (() => {
        const p: Platforms[] = ["web"];
        const packageJson = fs.readJSONSync(resolve(cwd, "package.json"));
        if (packageJson["dependencies"]["react-native"]) p.push("mobile");
        return p;
      })(),
      language: (() => {
        let language: Language = "javascript";
        if (fs.existsSync(resolve(cwd, "tsconfig.json")))
          language = "typescript";
        return language;
      })(),
      theme: "skeleton",
    },
    h: helpers,
  };

  return context;
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
  if (dest.endsWith(".ejs")) return dest.slice(0, -4);
  return dest;
};
