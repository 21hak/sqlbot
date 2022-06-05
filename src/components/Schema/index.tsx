import { useDatabaseSchema } from "@/apis/hooks";
import React, { FC, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { useRecoilValue } from "recoil";
import { databaseState } from "../../atoms";
import createTables from "../../lib/createTables";
import createEdges from "./createEdges";
import createNodes from "./createNodes";
import createTableTree from "./createTableTree";
import TableNode from "./TableNode";
// import "./index.css";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid: [number, number] = [20, 20];
const nodeTypes = {
  tableNode: TableNode,
};

interface SchemaProps {
  // attentionWeight?: AttentionWeightModel;
}

const Schema: FC<SchemaProps> = function ({}) {
  const database = useRecoilValue(databaseState);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const { data } = useDatabaseSchema({
    database: database,
    enabled: !!database,
  });

  useEffect(() => {
    if (data) {
      const tables = createTables(data);
      const tableTree = createTableTree(tables, data);
      const nodes = createNodes(tableTree);
      setNodes(nodes);
      const edges = createEdges(data);
      setEdges(edges);
    }
  }, [data]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1}
      fitView
      attributionPosition="bottom-left"></ReactFlow>
  );
};

export default Schema;
