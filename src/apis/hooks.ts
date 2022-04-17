import { useQuery } from "react-query";
import {
  AttentionWeightModel,
  CandidateModel,
  DatabaseSchemaModel,
  LanguageModelOutputModel,
  SchemaLinkModel,
} from "../lib/models";
import {
  getAttentionWeights,
  getCandidates,
  getDatabaseSchema,
  getLanguageModel,
  getSchemaLinks,
} from "./fetch";

export const useDatabaseSchema = () => {
  const rst = useQuery<DatabaseSchemaModel>(
    ["/database"],
    () => getDatabaseSchema(),
    {
      staleTime: Infinity,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  return rst;
};

export const useSchemaLinks = () => {
  const rst = useQuery<SchemaLinkModel[]>(
    ["/schema-links"],
    () => getSchemaLinks(),
    {
      staleTime: Infinity,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useAttentionWeights = () => {
  const rst = useQuery<AttentionWeightModel[]>(
    ["/attenion-weights"],
    () => getAttentionWeights(),
    {
      staleTime: Infinity,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useCandidates = () => {
  const rst = useQuery<CandidateModel>(["/candidates"], () => getCandidates(), {
    staleTime: Infinity,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  return rst;
};

export const useLanugageModel = () => {
  const rst = useQuery<LanguageModelOutputModel>(
    ["/language-model"],
    () => getLanguageModel(),
    {
      staleTime: Infinity,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};
