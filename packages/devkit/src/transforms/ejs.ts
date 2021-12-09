import ejs from "ejs";

export const transformEjs = async (source: string, context: any) => {
  return ejs.render(source, context);
};
