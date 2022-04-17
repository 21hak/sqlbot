import analyzeResultData from "../../public/analyzeResult.json";
import attentionWeightsData from "../../public/attentionWeights.json";
import candidateData from "../../public/candidates.json";
import schemaLinksData from "../../public/schemaLinksData.json";
import tableJson from "../../public/tables.json";
import {
  AttentionWeightModel,
  CandidateModel,
  DatabaseSchemaModel,
  LanguageModelOutputModel,
  SchemaLinkModel,
} from "../lib/models";
import { parseLanguageModelData } from "../lib/parse";
import parseAttentionWeightsData from "../lib/parseAttentionWeightsData";
import parseCandidateData from "../lib/parseCandidateData";
import parseDatabaseSchemaData from "../lib/parseDatabaseSchemeData";
import parseSchemaLinksData from "../lib/parseSchemaLinksData";

export function getDatabaseSchema(): Promise<DatabaseSchemaModel> {
  const jsonData = JSON.parse(JSON.stringify(tableJson));
  const data = parseDatabaseSchemaData(jsonData);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 100);
  });
}

export function getSchemaLinks(): Promise<SchemaLinkModel[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(parseSchemaLinksData(schemaLinksData));
    }, 100);
  });
}

export function getAttentionWeights(): Promise<AttentionWeightModel[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(parseAttentionWeightsData(attentionWeightsData));
    }, 100);
  });
}

export function getCandidates(): Promise<CandidateModel> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(parseCandidateData(candidateData));
    }, 100);
  });
}

export function getLanguageModel(): Promise<LanguageModelOutputModel> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(parseLanguageModelData(analyzeResultData));
    }, 100);
  });
}
