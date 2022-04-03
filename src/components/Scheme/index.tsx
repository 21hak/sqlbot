// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import React, { FC, useEffect } from "react";
import { useDatabaseSchema } from "../../apis/hooks";
import { AttentionWeightModel, SchemaLinkModel } from "../../lib/models";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import useEngine from "./utils/useEngine";

interface SchemaProps {
  attentionWeight?: AttentionWeightModel;
  schemaLink?: SchemaLinkModel;
}
const Schema: FC<SchemaProps> = function Schema({
  attentionWeight,
  // schemaLink,
}) {
  const { data } = useDatabaseSchema();

  const { engine, nodes } = useEngine(data);
  useEffect(() => {
    if (attentionWeight && nodes) {
      nodes.forEach((node) => {
        node.setWeights(
          attentionWeight.weights
            .filter((w) => w.key.split(".")[0] === node.table.name)
            .map((f) => {
              const [table, column] = f.key.split(".");
              return { key: column ? column : table, weight: f.weight };
            })
        );
      });
    }
  }, [attentionWeight, nodes]);

  // useEffect(() => {
  //   if (schemaLink && nodes) {
  //     nodes.forEach((node) => {
  //       node.setLinks({
  //         full: schemaLink.full
  //           .filter((f) => f.split(".")[0] === node.table.name)
  //           .map((f) => {
  //             const [table, column] = f.split(".");
  //             return column ? column : table;
  //           }),
  //         partial: schemaLink.partial
  //           .filter((p) => p.split(".")[0] === node.table.name)
  //           .map((p) => {
  //             const [table, column] = p.split(".");
  //             return column ? column : table;
  //           }),
  //       });
  //     });
  //   }
  // }, [schemaLink, nodes]);

  return (
    <DemoCanvasWidget>
      {engine && <CanvasWidget engine={engine} />}
    </DemoCanvasWidget>
  );
};
export default Schema;
