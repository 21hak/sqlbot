import { SchemaLinkModel } from "./models";

export default function parseSchemaLinksData(
  rawData: any
): Array<SchemaLinkModel> {
  return Object.entries(rawData).map(([k, v]: [string, any]) => ({
    word: k,
    full: v.full,
    partial: v.partial,
  }));
}
