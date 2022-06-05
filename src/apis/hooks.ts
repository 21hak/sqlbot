import { useQuery } from "react-query";
import {
  AttentionWeightModel,
  BeamSearchHistoryModel,
  CandidateModel,
  DatabaseSchemaModel,
  LanguageModelOutputModel,
  SchemaLinkModel,
} from "../lib/models";
import {
  getAttentionWeights,
  getBeanSearchHisotry,
  getCandidates,
  getDatabaseSchema,
  getLanguageModel,
  getSchemaLinks,
} from "./fetch";

export const useDatabaseSchema = ({
  database,
  enabled,
}: {
  database: string;
  enabled: boolean;
}) => {
  const rst = useQuery<DatabaseSchemaModel>(
    ["/database", database],
    () => getDatabaseSchema(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  return rst;
};

export const useSchemaLinks = ({
  naturalLanguage,
  database,
  enabled,
}: {
  naturalLanguage: string;
  database: string;
  enabled: boolean;
}) => {
  const rst = useQuery<SchemaLinkModel[]>(
    ["/schema-links", naturalLanguage, database],
    () => getSchemaLinks(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useAttentionWeights = ({
  token,
  database,
  enabled,
}: {
  token: string;
  database: string;
  enabled: boolean;
}) => {
  const rst = useQuery<AttentionWeightModel[]>(
    ["/attenion-weights", token, database],
    () => getAttentionWeights(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useCandidates = ({
  naturalLanguage,
  database,
  enabled,
}: {
  naturalLanguage: string;
  database: string;
  enabled: boolean;
}) => {
  const rst = useQuery<CandidateModel>(
    ["/candidates", naturalLanguage, database],
    () => getCandidates(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useLanugageModel = ({
  nl,
  database,
  enabled,
}: {
  nl: string;
  database: string;
  enabled: boolean;
}) => {
  const rst = useQuery<LanguageModelOutputModel>(
    ["/language-model", nl, database],
    () => getLanguageModel(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useBeamSearchHistoryModel = ({
  nl,
  database,
  enabled,
}: {
  nl: string;
  database: string;
  enabled: boolean;
}) => {
  const rst = useQuery<BeamSearchHistoryModel>(
    ["/beam-search-history-model", nl, database],
    () => getBeanSearchHisotry(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};
