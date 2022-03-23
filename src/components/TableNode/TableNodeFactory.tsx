import { TableNodeWidget } from "./TableNodeWidget";
import { TableNodeModel } from "./TableNodeModel";
import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DBScheme } from "../Scheme/type";

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
    return new TableNodeModel({} as DBScheme);
  }
}
