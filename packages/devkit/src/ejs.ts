import ejs from "ejs";

export const getEjsTransform =
  (_filePath: string) => async (source: string, context: any) => {
    return ejs.render(source, context);
  };
