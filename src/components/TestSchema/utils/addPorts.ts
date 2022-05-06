import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { TableModel } from "../../../lib/models";
export default function addPorts({
  table,
  node,
}: {
  table: TableModel;
  node: DefaultNodeModel;
}) {
  // node.addPort(new DefaultPortModel(true, "in", table.primaryKey.toLowerCase()));
  // node.addOutPort(new DefaultPortModel(true, "in", table.primaryKey.toLowerCase()));
  node.addInPort(table.primaryKey.toLowerCase());
  table.columns.forEach((c) => {
    const port = node.addOutPort(
      c.name.toLowerCase()
      // new DefaultPortModel(false, "out", c.name.toLowerCase())
    );
    // const port = node.addPort(
    //   new DefaultPortModel(false, "out", c.name.toLowerCase())
    // );
  });
  return node;
}
