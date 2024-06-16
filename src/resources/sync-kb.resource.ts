import { AxiosFactory, IKnowledgeBaseSynced } from "@/types";

export const syncKnowledgeBase = (
  api: AxiosFactory,
  knowledgeBaseId: string,
  orgId: string,
): Promise<IKnowledgeBaseSynced> => {
  const SYNC_KB_URL = `${process.env.NEXT_PUBLIC_API_URL as string}/knowledge_bases/sync/trigger/${knowledgeBaseId}/${orgId}`;

  return api()
    .get<IKnowledgeBaseSynced>(SYNC_KB_URL)
    .then(r => r.data);
};
