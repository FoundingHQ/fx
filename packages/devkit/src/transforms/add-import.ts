import j from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";

export const addImport = (
  program: Collection<j.Program>,
  importToAdd: j.ImportDeclaration
) => {
  const importStatementCount = program.find(j.ImportDeclaration).length;

  if (importStatementCount === 0) {
    program.find(j.Statement).at(0).insertBefore(importToAdd);
    return program;
  }

  try {
    program.find(j.ImportDeclaration).forEach((stmt, idx) => {
      const importValue = stmt.value.source.value;
      if (importToAdd.source.value === importValue) {
        console.error(
          `Skipping addImport, duplicate import found: ${importValue}`
        );
        throw new Error();
      } else {
        if (idx === importStatementCount - 1) {
          stmt.replace(stmt.node, importToAdd);
        }
      }
    });
  } catch (e) {}

  return program;
};
