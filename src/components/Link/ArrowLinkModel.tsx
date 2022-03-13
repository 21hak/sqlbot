import { DefaultLinkModel } from "@projectstorm/react-diagrams";

export class ArrowLinkModel extends DefaultLinkModel {
    constructor() {
      super({
        type: "arrow",
        width: 4,
      });
    }
  }