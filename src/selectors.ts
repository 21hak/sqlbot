import { selectorFamily } from "recoil";
import { AttentionWeightModel } from "./lib/models";
import { attentionWeightState } from "./atoms";

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
