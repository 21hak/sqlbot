import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  PortModelAlignment,
  DefaultPortModel,
} from "@projectstorm/react-diagrams";
import { ArrowLinkModel } from "../Link/ArrowLinkModel";

export class TablePortModel extends DefaultPortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: "table",
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): ArrowLinkModel {
    return new ArrowLinkModel();
  }
}
