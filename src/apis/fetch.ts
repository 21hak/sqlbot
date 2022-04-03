import attentionWeightsData from "../../public/attentionWeights.json";
import schemaLinksData from "../../public/schemaLinksData.json";
import tableJson from "../../public/tables.json";
import {
  AttentionWeightModel,
  DatabaseSchemaModel,
  SchemaLinkModel,
} from "../lib/models";
import parseAttentionWeightsData from "../lib/parseAttentionWeightsData";
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
