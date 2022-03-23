export type RawTableData = Array<{
  column_names: Array<[number, string]>;
  column_names_original: Array<[number, string]>;
  column_types: string[];
  db_id: string;
  foreign_keys: number[];
  primary_keys: number[];
  table_names: string[];
  table_names_original: string[];
}>;
export type DBScheme = {
  columnNames: Array<[number, string]>;
  columnNamesOriginal: Array<[number, string]>;
  columnTypes: string[];
  dbId: string;
  foreignKeys: Array<[number, number]>;
  primaryKeys: number[];
  tableNames: string[];
  tableNamesOriginal: string[];
};

// export type DBScheme = Array<TableScheme>;
