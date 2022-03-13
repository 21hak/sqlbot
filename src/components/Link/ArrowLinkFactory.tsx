import { DefaultLinkFactory } from "@projectstorm/react-diagrams";
import { ArrowLinkModel } from "./ArrowLinkModel";
import { ArrowLinkWidget } from "./ArrowLinkWidget";

export class ArrowLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("arrow");
  }

  generateModel(): ArrowLinkModel {
    return new ArrowLinkModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return <ArrowLinkWidget link={event.model} diagramEngine={this.engine} />;
  }
}
