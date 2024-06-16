import { UseQueryOptions } from "@tanstack/react-query";

import { syncKnowledgeBase } from "@/resources";
import { AxiosFactory, IKnowledgeBaseSynced } from "@/types";

export const syncKnowledgeBaseQuery = (
  api: AxiosFactory,
  knowledgeBaseId: string,
  orgId: string,
): UseQueryOptions<IKnowledgeBaseSynced, any> => ({
  queryKey: syncKnowledgeBaseQuery.key(knowledgeBaseId, orgId),
  refetchOnWindowFocus: false,
  queryFn: (): Promise<IKnowledgeBaseSynced> =>
    syncKnowledgeBase(api, knowledgeBaseId, orgId),
});

syncKnowledgeBaseQuery.key = (
  knowledgeBaseId: string,
  orgId: string,
) =>
  ["syncKnowledgeBase", knowledgeBaseId, orgId] as const;
