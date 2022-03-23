export interface ColumnModel {
  name: string;
  type: string;
}

export interface TableModel {
  name: string;
  columns: ColumnModel[];
  primaryKey: string;
}
