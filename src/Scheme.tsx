import createEngine, {
  DefaultNodeModel,
  DiagramModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import * as React from "react";
// import the custom models
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { TablePortFactory } from "./components/Port/TablePortFactory";
import { TablePortModel } from "./components/Port/TablePortModel";
import { TableNodeFactory } from "./components/TableNode/TableNodeFactory";
import { DemoCanvasWidget } from "./components/DemoCanvasWidget";
import { TableNodeModel } from "./components/TableNode/TableNodeModel";
import { ArrowLinkFactory } from "./components/Link/ArrowLinkFactory";

/**
 * @Author Dylan Vorster
 */
export default () => {
  //1) setup the diagram engine
  var engine = createEngine();

  // register some other factories as well
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

  //2) setup the diagram model
  var model = new DiagramModel();

  //3-A) create a default node
  var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  var port1 = node1.addOutPort("Out");
  node1.setPosition(100, 200);

  //3-B) create our new custom node
  var node2 = new TableNodeModel();
  node2.setPosition(250, 108);

  var node3 = new DefaultNodeModel("Node 3", "red");
  var port3 = node3.addInPort("In");
  node3.setPosition(500, 100);

  //3-C) link the 2 nodes together
  var link1 = port1.link(node2.getPort(PortModelAlignment.LEFT)!);
  const port = node2.getPort(PortModelAlignment.RIGHT) as TablePortModel
  const link2 = port.link(port3);
  // var link2 = port3.link(node2.getPort(PortModelAlignment.RIGHT)!);

  //4) add the models to the root graph
  model.addAll(node1, node2, node3, link1, link2);

  //5) load model into engine
  engine.setModel(model);

  //6) render the diagram!
  return (
    <DemoCanvasWidget>
      <CanvasWidget engine={engine} />
    </DemoCanvasWidget>
  );
};
