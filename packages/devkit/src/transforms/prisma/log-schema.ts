import fs from "fs-extra";
import { getSchema } from "@mrleebo/prisma-ast";

export async function logSchema(source: string) {
  const schema = await getSchema(source);
  const printPath = `${process.cwd()}/schema.json`;
  console.log(schema);
  console.log(`written to ${printPath}`);
  fs.writeFileSync(printPath, JSON.stringify(schema, null, 2));
}
