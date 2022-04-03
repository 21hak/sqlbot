import { AttentionWeightModel } from "./models";

export default function parseAttentionWeightsData(
  rawData: any
): Array<AttentionWeightModel> {
  return Object.entries(rawData).map(
    ([k, weight]: [k: string, weight: any]) => {
      return { word: k, weights: weight };
    }
  );
}
