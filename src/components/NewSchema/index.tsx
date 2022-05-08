import React, { FC, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { useSetRecoilState } from "recoil";
import { useDatabaseSchema } from "../../apis/hooks";
import { attentionWeightState } from "../../atoms";
import createTables from "../../lib/createTables";
import { AttentionWeightModel } from "../../lib/models";
// import ColorSelectorNode from "./ColorSelectorNode";
import createEdges from "./createEdges";
import createNodes from "./createNodes";
import createTableTree from "./createTableTree";
import TableNode from "./TableNode";
// import "./index.css";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid: [number, number] = [20, 20];
const nodeTypes = {
  // selectorNode: ColorSelectorNode,
  tableNode: TableNode,
};

interface SchemaProps {
  attentionWeight?: AttentionWeightModel;
}

const LastPage: FC<SchemaProps> = function ({ attentionWeight }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const setAttentionWeight = useSetRecoilState(attentionWeightState);
  const { data } = useDatabaseSchema();

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

  useEffect(() => {
    if (attentionWeight && nodes) {
      setAttentionWeight({
        word: attentionWeight.word,
        weights: attentionWeight.weights.map((f) => {
          return { key: f.key, weight: f.weight };
        }),
      });
    }
  }, [attentionWeight, nodes]);

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

export default LastPage;
