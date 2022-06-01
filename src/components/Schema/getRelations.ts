import { DBScheme } from "../Scheme/utils/type";

export default function getRelations(schema: DBScheme) {
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
