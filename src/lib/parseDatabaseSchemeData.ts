import { DatabaseSchemaModel } from "./models";

type RawData = Array<{
  column_names: Array<[number, string]>;
  column_names_original: Array<[number, string]>;
  column_types: string[];
  db_id: string;
  foreign_keys: Array<[number, number]>;
  primary_keys: number[];
  table_names: string[];
  table_names_original: string[];
}>;

export default function parseDatabaseSchemaData(rawData: RawData): DatabaseSchemaModel {
  return rawData.map((r) => ({
    columnNames: r.column_names,
    columnNamesOriginal: r.column_names_original,
    columnTypes: r.column_types,
    dbId: r.db_id,
    foreignKeys: r.foreign_keys,
    primaryKeys: r.primary_keys,
    tableNames: r.table_names,
    tableNamesOriginal: r.table_names_original,
  }))[0];
}
