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
  links: {
    full: string[];
    partial: string[];
  } = {
    full: [],
    partial: [],
  };

  constructor(table: TableModel) {
    super({
      type: "table",
    });
    this.table = table;
    this.addPort(new TablePortModel(PortModelAlignment.LEFT));
    this.addPort(new TablePortModel(PortModelAlignment.RIGHT));
  }

  setWeights(weights: Array<{ key: string; weight: number }>) {
    this.weights = weights;
  }
  setLinks({ full, partial }: { full: string[]; partial: string[] }) {
    this.links = { full, partial };
  }
}
