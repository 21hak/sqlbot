import { Edge, MarkerType } from "react-flow-renderer";
import { DatabaseSchemaModel } from "../../lib/models";
import { DBScheme } from "../Scheme/utils/type";

function getRelations(schema: DBScheme) {
  const tables = schema.tableNamesOriginal;
  const relations = schema.foreignKeys.map(([f1, f2], index) => {
    // if (schema.primaryKeys.includes(f1)) {
    //   return {
    //     to: {
    //       table: tables[schema.columnNamesOriginal[f1][0]],
    //       column: schema.columnNamesOriginal[f1][1].toLowerCase(),
    //     },
    //     from: {
    //       table: tables[schema.columnNamesOriginal[f2][0]],
    //       column: schema.columnNamesOriginal[f2][1].toLowerCase(),
    //     },
    //   };
    // } else {
    return {
      to: {
        table: tables[schema.columnNamesOriginal[f2][0]],
        column: schema.columnNamesOriginal[f2][1].toLowerCase(),
      },
      from: {
        table: tables[schema.columnNamesOriginal[f1][0]],
        column: schema.columnNamesOriginal[f1][1].toLowerCase(),
      },
    };
    // }
  });
  return relations;
}

export default function createEdges(schema: DatabaseSchemaModel): Edge[] {
  const relations = getRelations(schema);
  console.log(relations);
  const edges = relations.map((relation) => ({
    id: `${relation.from.column}-${relation.to.column}`,
    source: relation.from.table,
    target: relation.to.table,
    markerEnd: {
      type: MarkerType.Arrow,
    },
    type: "smoothstep",
    sourceHandle: relation.from.column.toLowerCase(),
    targetHandle: relation.to.column.toLowerCase(),
  }));
  return edges;
  return [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#fff" },
    },
    {
      id: "e2a-3",
      source: "2",
      target: "3",
      sourceHandle: "singer_id",
      targetHandle: "singer_id",
      // animated: true,
      style: { stroke: "#fff" },
    },
  ];
}
