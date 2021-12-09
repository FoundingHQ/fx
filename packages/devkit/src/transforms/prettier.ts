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

export const transformPrettier =
  (filePath: string) => async (source: string) => {
    const parser = getPrettierParser(filePath);
    if (parser) return prettier.format(source, { parser });
    return source;
  };
