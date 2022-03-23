import createEngine, {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import React, { useEffect, useRef, useState } from "react";
// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";

import { DemoCanvasWidget } from "../DemoCanvasWidget";

import tableJson from "../../../public/tables.json";

import TableEngine from "./makeEngine";
import makeEngine from "./makeEngine";
import parseData from "./parseData";
import createTables from "../../lib/createTables";

export default () => {
  const [ready, setReady] = useState(false);
  const engine = useRef<DiagramEngine | null>(null);
  useEffect(() => {
    const jsonData = JSON.parse(JSON.stringify(tableJson));
    const rawData = parseData(jsonData);
    engine.current = makeEngine(rawData);
    setReady(true);
  }, []);
  return (
    <DemoCanvasWidget>
      {engine.current && ready && <CanvasWidget engine={engine.current} />}
    </DemoCanvasWidget>
  );
};
