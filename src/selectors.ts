import { selectorFamily } from "recoil";
import { attentionWeightState } from "./atoms";
import { AttentionWeightModel } from "./lib/models";

export const attentionWeightByTable = selectorFamily<
  AttentionWeightModel,
  string
>({
  key: "attentionWeightByTable",
  get:
    (tableName: string) =>
    ({ get }) => {
      const attentionWeight = get(attentionWeightState);
      return {
        word: attentionWeight.word,
        weights: attentionWeight.weights
          .filter((w) => w.key.split(".")[0] === tableName)
          .map((f) => {
            const [table, column] = f.key.split(".");
            return { key: column ? column : table, weight: f.weight };
          }),
      };
    },
});
