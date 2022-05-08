import { Node, Position } from "react-flow-renderer";
import { TableTree, TreeNode } from "./createTableTree";
function createNode(
  tableNode: TreeNode,
  nodes: Node[],
  row: number,
  column: number
) {
  const node: Node = {
    id: `${tableNode.table.name}`,
    type: "tableNode",
    data: { table: tableNode.table },
    position: { x: 200 * column, y: 200 * row },
    style: {
      fontSize: 12,
      backgroundColor: "#FFF",
      borderRadius: 4,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
  nodes.push(node);
  tableNode.children.forEach((n, index) =>
    createNode(n, nodes, row + index, column + 1)
  );
}
export default function createNodes(tableTree: TableTree): Node[] {
  const nodes: Node[] = [];
  const row = 0;
  const column = 0;
  tableTree.map((tableNode, index) => {
    createNode(tableNode, nodes, row + index, column);
  });
  return nodes;

  // const nodes: any[] = tables.map((table, index) => ({
  //   id: `${table.name}`,
  //   type: "tableNode",
  //   data: { table: table },
  //   position: { x: 100 * index, y: 100 * index },
  //   style: {
  //     fontSize: 12,
  //     backgroundColor: "#FFF",
  //     borderRadius: 4,
  //   },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  // }));
  return nodes;
}
