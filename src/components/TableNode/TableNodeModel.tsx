import {
  DefaultNodeModel,
  DefaultNodeModelGenerics,
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { TablePortModel } from "../Port/TablePortModel";

export interface TableNodeModelGenerics {
  PORT: TablePortModel;
}

export class TableNodeModel extends DefaultNodeModel {
  constructor() {
    super({
      type: "table",
    });
    // this.addPort(new TablePortModel(PortModelAlignment.TOP));
    this.addPort(new TablePortModel(PortModelAlignment.LEFT));
    // this.addPort(new TablePortModel(PortModelAlignment.BOTTOM));
    this.addPort(new TablePortModel(PortModelAlignment.RIGHT));
  }
}
