import { ColumnModel, DatabaseSchemaModel, TableModel } from "./models";

export default function createTables(
  dbScheme: DatabaseSchemaModel
): TableModel[] {
  return dbScheme.tableNamesOriginal.map((tableName, index) => {
    const p = dbScheme.columnNamesOriginal[dbScheme.primaryKeys[index]][1];
    const cols: ColumnModel[] = [];
    const foreignKey: ColumnModel[] = [];
    dbScheme.columnNamesOriginal.forEach((c, i) => {
      if (c[0] === index) {
        cols.push({ name: c[1].toLowerCase(), type: dbScheme.columnTypes[i] });
        if (dbScheme.foreignKeys.some((f) => f[0] === i)) {
          foreignKey.push({
            name: c[1].toLowerCase(),
            type: dbScheme.columnTypes[i],
          });
        }
      }
    });

    return {
      name: tableName,
      primaryKey: p.toLowerCase(),
      columns: cols,
      foreignKey: foreignKey,
    };
  });
}
