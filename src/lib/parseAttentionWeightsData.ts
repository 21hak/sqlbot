import { AttentionWeightModel } from "./models";

export default function parseAttentionWeightsData(
  rawData: any
): Array<AttentionWeightModel> {
  return Object.entries(rawData).map(
    ([k, weight]: [k: string, weight: any]) => {
      return {
        word: k,
        weights: Object.entries(weight).map(([k2, v2]: any) => ({
          key: k2,
          weight: v2,
        })),
      };
    }
  );
}
