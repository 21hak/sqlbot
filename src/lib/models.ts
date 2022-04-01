export interface ColumnModel {
  name: string;
  type: string;
}

export interface TableModel {
  name: string;
  columns: ColumnModel[];
  primaryKey: string;
}

export interface SchemaLinkModel {
  word: string;
  full: string[];
  partial: string[];
}
