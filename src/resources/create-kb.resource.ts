import { AxiosFactory, IKnowledgeBaseCreated } from "@/types";

const CREATE_KB_URL = `${process.env.NEXT_PUBLIC_API_URL as string}/knowledge_bases`;

export const createKnowledgeBaseResource = (
  api: AxiosFactory,
  connectionId: string,
  resourceIds: string[],
): Promise<IKnowledgeBaseCreated> => {
  const data = {
    connection_id: connectionId,
    connection_source_ids: resourceIds,
    indexing_params: {
      ocr: false,
      unstructured: true,
      embedding_params: { embedding_model: "text-embedding-ada-002", api_key: null },
      chunker_params: { chunk_size: 1500, chunk_overlap: 500, chunker: "sentence" },
    },
    org_level_role: null,
    cron_job_id: null,
  };

  return api().post<IKnowledgeBaseCreated>(
    CREATE_KB_URL,
    data,
  )
    .then(r => r.data);
};
