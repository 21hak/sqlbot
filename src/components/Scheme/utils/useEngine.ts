import createEngine, {
  DiagramEngine,
  DiagramModel,
  PathFindingLinkFactory,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { useEffect, useState } from "react";
import createTables from "../../../lib/createTables";
import getRelations from "../../../lib/getRelations";
import { DatabaseSchemaModel } from "../../../lib/models";
import { ArrowLinkFactory } from "../../Link/ArrowLinkFactory";
import { TablePortFactory } from "../../Port/TablePortFactory";
import { TablePortModel } from "../../Port/TablePortModel";
import { TableNodeFactory } from "../../TableNode/TableNodeFactory";
import { TableNodeModel } from "../../TableNode/TableNodeModel";
import getPosition from "./getPosition";

export default function useEngine(schema?: DatabaseSchemaModel) {
  const [e, setE] = useState<DiagramEngine>();
  const [tableNodes, setTableNodes] = useState<TableNodeModel[]>();
  useEffect(() => {
    if (schema) {
      const engine = createEngine();
      engine
        .getPortFactories()
        .registerFactory(
          new TablePortFactory(
            "table",
            (config) => new TablePortModel(PortModelAlignment.LEFT)
          )
        );
      engine.getLinkFactories().registerFactory(new ArrowLinkFactory());
      engine.getNodeFactories().registerFactory(new TableNodeFactory());
      const pathfinding = engine
        .getLinkFactories()
        .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);

      const model = new DiagramModel();
      const tables = createTables(schema);
      const nodes = tables.map((table) => new TableNodeModel(table));
      setTableNodes(nodes);
      nodes.forEach((node, index) => {
        const [x, y] = getPosition(index);
        node.setPosition(x, y);
      });
      const relations = getRelations(schema);
      const links = relations.map(([to, from]) => {
        const portTo = nodes[to].getPort(
          PortModelAlignment.RIGHT!
        )! as TablePortModel;
        const portFrom = nodes[from].getPort(
          PortModelAlignment.RIGHT!
        )! as TablePortModel;
        const link = portFrom.link(portTo, pathfinding);
        return link;
      });

      model.addAll(...nodes, ...links);
      model.serialize();

      engine.setModel(model);
      setE(engine);
    }
  }, [schema]);
  return { engine: e, nodes: tableNodes };
}
