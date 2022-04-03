import { atom } from "recoil";
import { AttentionWeightModel, SchemaLinkModel } from "../../lib/models";
export const attentionWeightState = atom<AttentionWeightModel>({
  key: "attentionWeight",
  default: {
    word: "",
    weights: [],
  },
});

export const schemaLinkState = atom<SchemaLinkModel>({
  key: "schemaLink",
  default: { word: "", full: [], partial: [] },
});
