import { Node, Position } from "react-flow-renderer";
import { TableModel } from "../../lib/models";
export default function createNodes(tables: TableModel[]): Node[] {
  const nodes: any[] = tables.map((table, index) => ({
    id: `${table.name}`,
    type: "tableNode",
    data: { table: table },
    position: { x: 100 * index, y: 100 * index },
    style: {
      fontSize: 12,
      backgroundColor: "#FFF",
      borderRadius: 4,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));
  return nodes;
}
