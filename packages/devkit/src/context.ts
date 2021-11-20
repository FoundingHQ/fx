import * as changeCase from "change-case";
import inflection from "inflection";
import path, { resolve } from "path";
import { FX_PROJECT_PATHS } from "./config";

const pluralizedCamelCase = (s: string) => {
  return changeCase.camelCase(inflection.pluralize(s));
};

const helpers = {
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
  inflection,
  changeCase,
  path,
  pluralizedCamelCase,
};

export const extendContext = (context: any) => {
  return {
    ...context,
    h: helpers,
  };
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
  return resolve(FX_PROJECT_PATHS.generatorRoot, interpolate(path, context));
};

export const convertTemplateDestPaths = (
  path: string,
  context: Record<string, any> = {}
) => {
  const dest = resolve(
    FX_PROJECT_PATHS.projectRoot,
    interpolate(path, context)
  );
  if (dest.endsWith(".ejs")) return dest.slice(0, -4);
  return dest;
};
