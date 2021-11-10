import * as changeCase from "change-case";
import inflection from "inflection";
import path from "path";

const prismaToTypescriptMap: any = {
  Int: "number",
  String: "string",
  DateTime: "string",
};

const prismaToTypescript = (attr: string) => {
  const [key, val] = attr.split(":");
  return `${key}: ${prismaToTypescriptMap[val]}`;
};

const helpers = {
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
  inflection,
  changeCase,
  path,
  prismaToTypescript,
};

export const extendContext = (context: any) => {
  return {
    ...context,
    h: helpers,
  };
};
