import { useQuery } from "react-query";
import {
  AttentionWeightModel,
  DatabaseSchemaModel,
  SchemaLinkModel,
} from "../lib/models";
import {
  getAttentionWeights,
  getDatabaseSchema,
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
