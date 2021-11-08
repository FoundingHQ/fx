import inflection from "inflection";
import changeCase from "change-case";
import path from "path";

const helpers = {
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
  inflection,
  changeCase,
  path,
};

export const extendContext = (context: any) => {
  return {
    ...context,
    h: helpers,
  };
};
