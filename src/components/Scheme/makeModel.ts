import { DiagramModel } from "@projectstorm/react-diagrams";
import { TableNodeModel } from "../TableNode/TableNodeModel";
import getPosition from "./getPosition";
import TableEngine from "./makeEngine";
import { DBScheme, TableScheme } from "./type";

export default function makeModel(dbScheme: DBScheme) {
  //2) setup the diagram model
  const model = new DiagramModel();
  const nodes = dbScheme.map((table) => new TableNodeModel(table));
  nodes.forEach((node, index) => {
    const pos = getPosition(index);
    node.setPosition(pos[0], pos[1]);
  });

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
  model.addAll(...nodes);
  return model;
  //5) load model into engine
  //   engine.setModel(model);
}
