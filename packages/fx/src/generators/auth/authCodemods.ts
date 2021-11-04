import jscodeshift from "jscodeshift";

const j = jscodeshift.withParser("ts");

export const createTransformPassport = (context = {}) => {
  return (source: string) => {
    // console.log("transforming file source:");
    // console.log(source);
    // console.log("with context:", context);
    // const root = j(source);
    // console.log("root:", root);
    return source;
  };
};

export const createTransformServerHandler = (context = {}) => {
  return (source: string) => {};
};
