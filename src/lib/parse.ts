import {
  AttentionWeightModel,
  BeamSearchHistoryModel,
  DatabaseSchemaModel,
  LanguageModelOutputModel,
  SchemaLinkModel,
} from "./models";
import { renameKeys } from "./utils";

type RawData = Array<{
  column_names: Array<[number, string]>;
  column_names_original: Array<[number, string]>;
  column_types: string[];
  db_id: string;
  foreign_keys: Array<[number, number]>;
  primary_keys: number[];
  table_names: string[];
  table_names_original: string[];
}>;

export function parseDatabaseSchemaData(rawData: RawData): DatabaseSchemaModel {
  return rawData.map((r) => ({
    columnNames: r.column_names,
    columnNamesOriginal: r.column_names_original,
    columnTypes: r.column_types,
    dbId: r.db_id,
    foreignKeys: r.foreign_keys,
    primaryKeys: r.primary_keys,
    tableNames: r.table_names,
    tableNamesOriginal: r.table_names_original,
  }))[0];
}

export function parseAttentionWeightsData(
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

export function parseSchemaLinksData(rawData: any): Array<SchemaLinkModel> {
  return Object.entries(rawData).map(([k, v]: [string, any]) => ({
    word: k,
    full: v.full,
    partial: v.partial,
  }));
}

export function parseLanguageModelData(rawData: any): LanguageModelOutputModel {
  const newKeys = {
    input_tokens: "inputTokens",
    output_tokens: "outputTokens",
  };
  const renamedObj = renameKeys(rawData, newKeys);
  return renamedObj;
}

export function parseBeamSearchHistory(rawData: any): BeamSearchHistoryModel {
  
  return rawData
}

