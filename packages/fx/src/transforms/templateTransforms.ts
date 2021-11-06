import jscodeshift, { JSCodeshift, Collection } from "jscodeshift";

type MacroType = "@@template" | "@@include";

type TemplateArgs = {
  key: string;
  operator: string;
  value: string;
};

type IncludeArgs = { filepath: string };

type Macro<ArgType = any> = {
  type: MacroType | null;
  args?: ArgType;
  template?: string;
};

type Context = Record<string, any>;

const argsParser = {
  "@@template": (macroArgs = ""): TemplateArgs => {
    const [key, operator, value] = macroArgs
      .split(" ")
      .map((v: string) => v.trim());

    return {
      key,
      operator,
      value,
    };
  },
  "@@include": (macroArgs = ""): IncludeArgs => {
    const [filepath] = macroArgs.split(" ").map((v: string) => v.trim());

    return { filepath };
  },
};

const parseComment = (comment: { value: string }) => {
  const [commentMacro, ...template] = comment.value.split("\n");
  const [macroType, macroArgs] = commentMacro
    .split(":")
    .map((v: string) => v.trim());

  const parser = argsParser[macroType as MacroType];

  if (!parser) return { type: null };

  return {
    type: macroType as MacroType,
    args: parser(macroArgs),
    template: template.filter((l) => !!l.trim()).join("\n"),
  };
};

const throwOperationError = (key: string, context: Context) => {
  console.log();
  console.error(`"${key}" is not defined in context`);
  console.error("context:", context);
  console.log();
  throw new Error("operation error");
};

const templateOperationMap = {
  is: (context: Context, key: string, value: string) => {
    if (!context[key]) throwOperationError(key, context);
    return context[key] === value;
  },
  includes: (context: Context, key: string, value: string) => {
    if (!context[key] || !Array.isArray(context[key]))
      throwOperationError(key, context);
    return context[key].includes(value);
  },
};

const operationFilter = {
  "@@template": (macro: Macro<TemplateArgs>, context: Context) => {
    if (!macro.args) throw new Error("Invalid macro args");
    const operation =
      templateOperationMap[
        macro.args.operator as keyof typeof templateOperationMap
      ];
    if (!operation) throw new Error("Invalid macro operator");
    const matches = operation(context, macro.args.key, macro.args.value);

    return matches;
  },
  "@@include": (macro: Macro<IncludeArgs>, context: Context) => {
    if (!macro.args) throw new Error("Invalid macro args");
    console.log("@@include has not been implemented yet");
    return false;
  },
};

export const templateTransform = (source: string, context: Context) => {
  return source;
};

export const createTemplateTransform = (context: Context) => {
  return (source: string) => templateTransform(source, context);
};

export const jscodeshiftTemplateTransform = (
  j: JSCodeshift,
  root: Collection,
  context: Context
) => {
  root.find(j.Comment).forEach((path) => {
    const comment = path.value;
    const macro = parseComment(comment);
    if (!macro.type) return;
    const operationResult = operationFilter[macro.type](
      macro as Macro,
      context
    );

    if (macro.type === "@@template" && operationResult) {
      path.parentPath.parentPath.insertBefore(macro.template);
    }

    path.prune();
  });

  return root.toSource();
};

export const createJscodeshiftTemplateTransform = (context = {}) => {
  return (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const root = j(source);
    return jscodeshiftTemplateTransform(j, root, context);
  };
};
