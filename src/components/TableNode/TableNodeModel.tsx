import {
  DefaultNodeModel,
  DefaultNodeModelGenerics,
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { TableModel } from "../../lib/models";
import { TablePortModel } from "../Port/TablePortModel";
import { DBScheme } from "../Scheme/utils/type";

export interface TableNodeModelGenerics {
  PORT: TablePortModel;
}

export class TableNodeModel extends DefaultNodeModel {
  table: TableModel;
  constructor(table: TableModel) {
    super({
      type: "table",
    });
    this.table = table;
    // this.addPort(new TablePortModel(PortModelAlignment.TOP));
    this.addPort(new TablePortModel(PortModelAlignment.LEFT));
    // this.addPort(new TablePortModel(PortModelAlignment.BOTTOM));
    this.addPort(new TablePortModel(PortModelAlignment.RIGHT));
  }
}
