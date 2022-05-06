export interface ColumnModel {
  name: string;
  type: string;
}

export interface TableModel {
  name: string;
  columns: ColumnModel[];
  primaryKey: string;
  foreignKey: ColumnModel[];
}

export interface SchemaLinkModel {
  word: string;
  full: string[];
  partial: string[];
}

export interface AttentionWeightModel {
  word: string;
  weights: Array<{
    key: string;
    weight: number;
  }>;
}

export interface RawTableData {
  column_names: Array<[number, string]>;
  column_names_original: Array<[number, string]>;
  column_types: string[];
  db_id: string;
  foreign_keys: Array<[number, number]>;
  primary_keys: number[];
  table_names: string[];
  table_names_original: string[];
}
export interface DatabaseSchemaModel {
  columnNames: Array<[number, string]>;
  columnNamesOriginal: Array<[number, string]>;
  columnTypes: string[];
  dbId: string;
  foreignKeys: Array<[number, number]>;
  primaryKeys: number[];
  tableNames: string[];
  tableNamesOriginal: string[];
}

export interface CandidateModel {
  words: string[];
  synonyms: string[][];
}

export interface LanguageModelOutputModel {
  inputTokens: string[];
  outputTokens: string[];
  weights1: number[][];
  weights2: number[][];
}

// export type DBScheme = Array<TableScheme>;
