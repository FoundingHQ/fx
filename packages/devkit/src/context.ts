import * as changeCase from "change-case";
import inflection from "inflection";
import path from "path";

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
