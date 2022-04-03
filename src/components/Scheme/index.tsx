// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import React, { FC, useEffect, useState } from "react";
import { useDatabaseSchema } from "../../apis/hooks";
import { AttentionWeightModel } from "../../lib/models";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import { TableNodeModel } from "../TableNode/TableNodeModel";
import useEngine from "./utils/useEngine";

interface SchemaProps {
  attentionWeight?: AttentionWeightModel;
}
const Schema: FC<SchemaProps> = function Schema({ attentionWeight }) {
  const { data } = useDatabaseSchema();
  const [tableModels, setTableModels] = useState<TableNodeModel[]>([]);
  const { engine, nodes } = useEngine(data);
  useEffect(() => {
    if (attentionWeight && nodes) {
      nodes.forEach((node) => {
        node.setWeights(
          attentionWeight.weights.filter(
            (w) => w.key.split(".")[0] === node.table.name
          )
        );
      });
    }
  }, [attentionWeight, nodes]);

  return (
    <DemoCanvasWidget>
      {engine && <CanvasWidget engine={engine} />}
    </DemoCanvasWidget>
  );
};
export default Schema;
