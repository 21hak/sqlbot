import createEngine, {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  PathFindingLinkFactory,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import createTables from "../../lib/createTables";
import { ArrowLinkFactory } from "../Link/ArrowLinkFactory";
import { TablePortFactory } from "../Port/TablePortFactory";
import { TablePortModel } from "../Port/TablePortModel";
import { TableNodeFactory } from "../TableNode/TableNodeFactory";
import { TableNodeModel } from "../TableNode/TableNodeModel";
import getPosition from "./getPosition";
import { DBScheme } from "./type";

export default function makeEngine(dbScheme: DBScheme) {
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
  const tables = createTables(dbScheme);

  const nodes = tables.map((table) => new TableNodeModel(table));
  nodes.forEach((node, index) => {
    const [x, y] = getPosition(index);
    node.setPosition(x, y);
  });
  const relations = dbScheme.foreignKeys.map(([f1, f2], index) => {
    let to;
    let from;
    if (dbScheme.primaryKeys.includes(f1)) {
      to = dbScheme.columnNamesOriginal[f1][0];
      from = dbScheme.columnNamesOriginal[f2][0];
    } else {
      to = dbScheme.columnNamesOriginal[f2][0];
      from = dbScheme.columnNamesOriginal[f1][0];
    }
    return [to, from];
  });
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
  // return model;

  engine.setModel(model);
  return engine;
}

// export default class TableEngine {
//   engine: DiagramEngine;
//   constructor() {
//     this.engine = createEngine();
//     this.engine
//       .getPortFactories()
//       .registerFactory(
//         new TablePortFactory(
//           "table",
//           (config) => new TablePortModel(PortModelAlignment.LEFT)
//         )
//       );
//     this.engine.getLinkFactories().registerFactory(new ArrowLinkFactory());
//     this.engine.getNodeFactories().registerFactory(new TableNodeFactory());
//   }
// }
