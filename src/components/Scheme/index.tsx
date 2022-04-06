// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import React, { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useDatabaseSchema } from "../../apis/hooks";
import { AttentionWeightModel } from "../../lib/models";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import { attentionWeightState } from "./atoms";
import useEngine from "./utils/useEngine";

interface SchemaProps {
  attentionWeight?: AttentionWeightModel;
}
const Schema: FC<SchemaProps> = function Schema({ attentionWeight }) {
  const { data } = useDatabaseSchema();
  const setAttentionWeight = useSetRecoilState(attentionWeightState);

  const { engine, nodes } = useEngine(data);
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

  return (
    <DemoCanvasWidget>
      {engine && <CanvasWidget engine={engine} />}
    </DemoCanvasWidget>
  );
};
export default Schema;
