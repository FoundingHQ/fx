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

const destructureAttributes = (attributes: string) => {
  return attributeKeys(attributes).join(", ");
};

const attributeKeys = (attributes: string) => {
  const attrs = attributes.split(" ");
  const attrsKeys = attrs.map((attr) => {
    const [key, _val] = attr.split(":");
    return key;
  });
  return attrsKeys;
};

const helpers = {
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
  inflection,
  changeCase,
  path,
  prismaToTypescript,
  destructureAttributes,
  attributeKeys,
};

export const extendContext = (context: any) => {
  return {
    ...context,
    h: helpers,
  };
};
