export interface IKnowledgeBaseCreated {
  connection_id: string;
  connection_source_ids: string[];
  created_at: string;
  cronjob_id: string | null;
  knowledge_base_id: string;
  org_id: string;
  org_level_role: string | null;
  updated_at: string;

  // Not needed
  indexing_params: Record<"embedding_params" | "chunker_params", unknown>;
}
