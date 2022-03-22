import {
  DefaultNodeModel,
  DefaultNodeModelGenerics,
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { TablePortModel } from "../Port/TablePortModel";
import { TableScheme } from "../Scheme/type";

export interface TableNodeModelGenerics {
  PORT: TablePortModel;
}

export class TableNodeModel extends DefaultNodeModel {
  scheme: TableScheme;
  constructor(tableScheme: TableScheme) {
    super({
      type: "table",
    });
    this.scheme = tableScheme;
    // this.addPort(new TablePortModel(PortModelAlignment.TOP));
    this.addPort(new TablePortModel(PortModelAlignment.LEFT));
    // this.addPort(new TablePortModel(PortModelAlignment.BOTTOM));
    this.addPort(new TablePortModel(PortModelAlignment.RIGHT));
  }
}
