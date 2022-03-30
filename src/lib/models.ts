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
  full: string[];
  partial: string[];
}
