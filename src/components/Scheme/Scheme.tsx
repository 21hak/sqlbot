import createEngine, {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import React, { useEffect, useRef, useState } from "react";
// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { TablePortFactory } from "../Port/TablePortFactory";
import { TablePortModel } from "../Port/TablePortModel";
import { TableNodeFactory } from "../TableNode/TableNodeFactory";
import { DemoCanvasWidget } from "../DemoCanvasWidget";
import { TableNodeModel } from "../TableNode/TableNodeModel";
import { ArrowLinkFactory } from "../Link/ArrowLinkFactory";
import tableJson from "../../../public/tables.json";
import { TableScheme } from "./type";
import makeModel from "./makeModel";
import TableEngine from "./makeEngine";
import makeEngine from "./makeEngine";
import parseData from "./parseData";

export default () => {
  const [ready, setReady] = useState(false);
  const engine = useRef<DiagramEngine | null>(null);
  useEffect(() => {
    const table = JSON.parse(JSON.stringify(tableJson));
    // const model = makeModel(parseData(table));
    engine.current = makeEngine(parseData(table));
    
    // engine.current.setModel(model);
    setReady(true);
  }, []);
  return (
    <DemoCanvasWidget>
      {engine.current && ready && <CanvasWidget engine={engine.current} />}
    </DemoCanvasWidget>
  );
};
