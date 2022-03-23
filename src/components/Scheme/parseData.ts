import { DBScheme, RawTableData } from "./type";

export default function parseData(rawData: RawTableData): DBScheme {
  return rawData.map((r) => ({
    columnNames: r.column_names,
    columnNamesOriginal: r.column_names_original,
    columnTypes: r.column_types,
    dbId: r.db_id,
    foreignKeys: r.foreign_keys,
    primaryKeys: r.primary_keys,
    tableNames: r.table_names,
    tableNamesOriginal: r.table_names_original,
  }))[1];
}
