import createEngine, {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { useEffect, useState } from "react";
import createTables from "../../../lib/createTables";
import { DatabaseSchemaModel } from "../../../lib/models";
import getPosition from "../../Scheme/utils/getPosition";
import addLinks from "./addLinks";
import addPorts from "./addPorts";
export default function useEngine(schema?: DatabaseSchemaModel) {
  const [e, setE] = useState<DiagramEngine>();
  const [tableNodes, setTableNodes] = useState<DefaultNodeModel[]>();
  useEffect(() => {
    if (schema) {
      console.log(schema);
      const engine = createEngine();
      const tables = createTables(schema);

      const nodes = tables.map((table) => {
        return addPorts({
          table: table,
          node: new DefaultNodeModel(table.name, "rgb(0,192,255)"),
        });
      });

      nodes.forEach((node, index) => {
        const [x, y] = getPosition(index);
        node.setPosition(x, y);
      });

      const links = addLinks({ schema: schema, nodes: nodes, engine: engine });
      const model = new DiagramModel();
      model.addAll(...nodes, ...links);

      engine.setModel(model);
      setE(engine);
    }
  }, [schema]);
  return { engine: e, nodes: tableNodes };
}
