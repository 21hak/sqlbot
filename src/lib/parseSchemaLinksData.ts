import { SchemaLinkModel } from "./models";

export default function parseSchemaLinksData(
  rawData: any
): Array<SchemaLinkModel> {
  return Object.entries(rawData).map(([k, v]: [string, any]) => {
    const full = v.full.map((f: string) => {
      const splitFull = f.split(".");
      return splitFull[splitFull.length - 1];
    });
    const partial = v.partial.map((f: string) => {
      const splitPartial = f.split(".");
      return splitPartial[splitPartial.length - 1];
    });
    return {
      word: k,
      full: full,
      partial: partial,
    };
  });
}
