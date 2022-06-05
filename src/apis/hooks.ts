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
export const useDatabaseSchemaTemp = ({
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

export const useSchemaLinksTemp = ({
  naturalLanguage,
  enabled,
}: {
  naturalLanguage: string;
  enabled: boolean;
}) => {
  const rst = useQuery<SchemaLinkModel[]>(
    ["/schema-links", naturalLanguage],
    () => getSchemaLinks(),
    {
      enabled: enabled,
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

export const useCandidatesTemp = ({
  naturalLanguage,
  enabled,
}: {
  naturalLanguage: string;
  enabled: boolean;
}) => {
  const rst = useQuery<CandidateModel>(
    ["/candidates", naturalLanguage],
    () => getCandidates(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
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

export const useLanugageModelTemp = ({
  nl,
  enabled,
}: {
  nl: string;
  enabled: boolean;
}) => {
  const rst = useQuery<LanguageModelOutputModel>(
    ["/language-model", nl],
    () => getLanguageModel(),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};

export const useBeamSearchHistoryModel = () => {
  const rst = useQuery<BeamSearchHistoryModel>(
    ["/beam-search-history-model"],
    () => getBeanSearchHisotry(),
    {
      staleTime: Infinity,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  return rst;
};
