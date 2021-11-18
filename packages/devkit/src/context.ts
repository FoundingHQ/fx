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

const destructureAttributes = (attributes: any) => {
  return Object.keys(attributes).join(", ");
};

const attributeKeys = (attributes: string) => {
  const attrs = Object.keys(attributes);
  const attrsKeys = attrs.map((attr) => {
    const [key, _val] = attr.split(":");
    return key;
  });
  return attrsKeys;
};

const pluralizedCamelCase = (s: string) => {
  return changeCase.camelCase(inflection.pluralize(s));
};

const helpers = {
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
  inflection,
  changeCase,
  path,
  prismaToTypescript,
  destructureAttributes,
  attributeKeys,
  pluralizedCamelCase,
};

export const extendContext = (context: any) => {
  return {
    ...context,
    h: helpers,
  };
};
