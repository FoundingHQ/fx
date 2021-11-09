import ejs from "ejs";
import prettier from "prettier";

export const filetypeToPrettierParser = {
  ts: "typescript",
  tsx: "typescript",
  js: "babel",
  jsx: "babel",
  json: "json",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  html: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",
  graphql: "graphql",
};

export const getPrettierParser = (filePath: string) => {
  const filetype = filePath.slice(
    filePath.lastIndexOf(".") + 1
  ) as keyof typeof filetypeToPrettierParser;
  return filetypeToPrettierParser[filetype] || null;
};

export const getEjsTransform = (_filePath: string) => ejs.render;

export const getPrettierTransform = (filePath: string) => (source: string) => {
  const parser = getPrettierParser(filePath);
  if (parser) return prettier.format(source, { parser });
  return source;
};
