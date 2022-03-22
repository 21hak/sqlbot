export type RawTableData = Array<{
  column_names: Array<[number, string]>;
  column_names_original: Array<[number, string]>;
  column_types: string[];
  db_id: string;
  foreign_keys: number[];
  primary_keys: number[];
  table_names: number[];
  table_names_original: number[];
}>;
export type TableScheme = {
  columnNames: Array<[number, string]>;
  columnNamesOriginal: Array<[number, string]>;
  columnTypes: string[];
  dbId: string;
  foreignKeys: number[];
  primaryKeys: number[];
  tableNames: number[];
  tableNamesOriginal: number[];
};

export type DBScheme = Array<TableScheme>;
