import { CanvasWidget } from "@projectstorm/react-canvas-core";
import * as React from "react";
import { FC } from "react";
import { useDatabaseSchema } from "../../apis/hooks";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import useEngine from "./utils/useEngine";

const Schema: FC = () => {
  const { data } = useDatabaseSchema();

  const { engine, nodes } = useEngine(data);

  return (
    <DemoCanvasWidget>
      {engine && <CanvasWidget engine={engine} />}
    </DemoCanvasWidget>
  );
};

export default Schema;
