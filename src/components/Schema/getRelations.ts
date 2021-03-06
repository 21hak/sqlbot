import { DatabaseSchemaModel } from "../../lib/models";


export default function getRelations(schema: DatabaseSchemaModel) {
  const tables = schema.tableNamesOriginal;
  const relations = schema.foreignKeys.map(([f1, f2], index) => {
    return {
      to: {
        table: tables[schema.columnNamesOriginal[f2][0]],
        column: schema.columnNamesOriginal[f2][1].toLowerCase(),
      },
      from: {
        table: tables[schema.columnNamesOriginal[f1][0]],
        column: schema.columnNamesOriginal[f1][1].toLowerCase(),
      },
    };
    // }
  });
  return relations;
}
