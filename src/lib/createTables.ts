import { DBScheme } from "../components/Scheme/type";
import { ColumnModel, TableModel } from "./models";

export default function createTables(dbScheme: DBScheme): TableModel[] {
  return dbScheme.tableNamesOriginal.map((tableName, index) => {
    const cols: ColumnModel[] = [];
    dbScheme.columnNamesOriginal.forEach((c, i) => {
      if (c[0] === index) {
        cols.push({ name: c[1], type: dbScheme.columnTypes[i] });
      }
    });
    const p = dbScheme.columnNamesOriginal[dbScheme.primaryKeys[index]][1];
    return {
      name: tableName,
      primaryKey: p,
      columns: cols,
    };
  });
}
