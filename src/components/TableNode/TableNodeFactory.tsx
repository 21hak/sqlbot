import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import * as React from "react";
import { TableModel } from "../../lib/models";
import { TableNodeModel } from "./TableNodeModel";
import { TableNodeWidget } from "./TableNodeWidget";

export class TableNodeFactory extends AbstractReactFactory<
  TableNodeModel,
  DiagramEngine
> {
  constructor() {
    super("table");
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <TableNodeWidget engine={this.engine} size={50} node={event.model} />
    );
  }

  generateModel(event: any) {
    return new TableNodeModel({} as TableModel);
  }
}
