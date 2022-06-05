import { atom } from "recoil";
import { AttentionWeightModel, SchemaLinkModel } from "./lib/models";
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

export const candidateState = atom<string>({
  key: "candidate",
  default: "",
});

export const tokenState = atom<string>({
  key: "token",
  default: "",
});

export const schemaNaturalLanguage = atom<string>({
  key: "schema-nl",
  default: "",
});

export const databaseState = atom<string>({
  key: "database",
  default: "",
});

export const dependencyNaturalLanguage = atom<string>({
  key: "dependency-nl",
  default: "",
});

export const beamSearchNaturalLanguage = atom<string>({
  key: "beamSearch-nl",
  default: "",
});

export const naturalLanguageState = atom<string>({
  key: "nl",
  default: "",
});
