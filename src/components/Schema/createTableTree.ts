import { DatabaseSchemaModel, TableModel } from "../../lib/models";
import getRelations from "./getRelations";

export interface TreeNode {
  id: number;
  table: TableModel;
  parentId: number | null;
  children: TreeNode[];
}
export type TableTree = TreeNode[];

export default function createTableTree(
  tables: TableModel[],
  schema: DatabaseSchemaModel
) {
  const roots = [] as TreeNode[];
  const entries: TreeNode[] = tables.map((t, index) => ({
    id: index,
    table: t,
    parentId: null as number | null,
    children: [] as any[],
  }));
  const relations = getRelations(schema);
  relations.forEach((r) => {
    const parentIndex = tables.findIndex(
      (table) => table.name === r.from.table
    );
    const childrenIndex = tables.findIndex(
      (table) => table.name === r.to.table
    );

    entries[childrenIndex].parentId = parentIndex;
  });

  entries.forEach((e, i) => {
    if (e.parentId) {
      entries[e.parentId].children.push(e);
    } else {
      roots.push(e);
    }
  });
  return roots;
}
