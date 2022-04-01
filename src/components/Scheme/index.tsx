import { DiagramEngine } from "@projectstorm/react-diagrams";
import React, { FC, useEffect, useRef, useState } from "react";
// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";

import { DemoCanvasWidget } from "../DemoCanvasWidget";

import tableJson from "../../../public/tables.json";

import TableEngine from "./utils/makeEngine";
import makeEngine from "./utils/makeEngine";
import parseData from "./utils/parseData";
import createTables from "../../lib/createTables";
import dynamic from "next/dynamic";

interface SchemaProps{
  
}
const Schema: FC = function Schema({}) {
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
export default Schema;
