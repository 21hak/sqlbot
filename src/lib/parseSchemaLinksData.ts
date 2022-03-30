import { SchemaLinkModel } from "./models";

export default function parseSchemaLinksData(rawData: any): {
  [key: string]: SchemaLinkModel;
} {
  return rawData;
}
