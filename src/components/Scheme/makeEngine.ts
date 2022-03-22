import createEngine, {
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  PathFindingLinkFactory,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
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
  const nodes = dbScheme.map((table) => new TableNodeModel(table));
  nodes.forEach((node, index) => {
    const pos = getPosition(index);
    node.setPosition(pos[0], pos[1]);
  });

  const port1 = nodes[0].getPort(PortModelAlignment.RIGHT!)! as TablePortModel;
  const port2 = nodes[3].getPort(PortModelAlignment.RIGHT!) as TablePortModel;
  const link1 = port1.link(port2, pathfinding);
  //   const port = node2.getPort(PortModelAlignment.RIGHT) as TablePortModel;
  //   const link2 = port.link(port3);
  // var link2 = port3.link(node2.getPort(PortModelAlignment.RIGHT)!);
  //   //3-A) create a default node
  //   var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  //   var port1 = node1.addOutPort("Out");
  //   node1.setPosition(100, 200);

  //   //3-B) create our new custom node
  //   var node2 = new TableNodeModel();
  //   node2.setPosition(250, 108);

  //   var node3 = new DefaultNodeModel("Node 3", "red");
  //   var port3 = node3.addInPort("In");
  //   node3.setPosition(500, 100);

  //   //3-C) link the 2 nodes together
  //   var link1 = port1.link(node2.getPort(PortModelAlignment.LEFT)!);
  //   const port = node2.getPort(PortModelAlignment.RIGHT) as TablePortModel;
  //   const link2 = port.link(port3);
  // var link2 = port3.link(node2.getPort(PortModelAlignment.RIGHT)!);

  //4) add the models to the root graph
  model.addAll(...nodes, link1);
  model.serialize()
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
