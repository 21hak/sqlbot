import { DatabaseSchemaModel } from "./models";

export default function getRelations(schema: DatabaseSchemaModel) {
  const relations = schema.foreignKeys.map(([f1, f2], index) => {
    let to;
    let from;
    if (schema.primaryKeys.includes(f1)) {
      to = schema.columnNamesOriginal[f1][0];
      from = schema.columnNamesOriginal[f2][0];
    } else {
      to = schema.columnNamesOriginal[f2][0];
      from = schema.columnNamesOriginal[f1][0];
    }
    return [to, from];
  });
  return relations;
}
