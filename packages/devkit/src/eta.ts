import eta from "eta";

export const getEtaTransform =
  (_filePath: string) => async (source: string, context: any) => {
    return eta.render(source, context);
  };
