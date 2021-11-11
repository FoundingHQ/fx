import jscodeshift from "jscodeshift";

export const createJscodeshiftProgram = (source: string) => {
  const j = jscodeshift.withParser("tsx");
  return j(source);
};

export const createJscodeshiftTransform =
  (transform: any) => async (source: string, context: any) => {
    let program = createJscodeshiftProgram(source);
    program = await transform(program, context);
    return program.toSource();
  };

export const jStatement = jscodeshift.template.statement;
