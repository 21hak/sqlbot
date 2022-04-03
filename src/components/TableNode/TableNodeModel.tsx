import {
  DefaultNodeModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { TableModel } from "../../lib/models";
import { TablePortModel } from "../Port/TablePortModel";

export interface TableNodeModelGenerics {
  PORT: TablePortModel;
}

export class TableNodeModel extends DefaultNodeModel {
  table: TableModel;
  weights: Array<{ key: string; weight: number }> = [];
  test: string = "";
  constructor(table: TableModel) {
    super({
      type: "table",
    });
    this.table = table;
    this.addPort(new TablePortModel(PortModelAlignment.LEFT));
    this.addPort(new TablePortModel(PortModelAlignment.RIGHT));
  }

  setTest(v: string) {
    this.test = v;
  }
  setWeights(weights: Array<{ key: string; weight: number }>) {
    this.weights = weights;
  }
}
