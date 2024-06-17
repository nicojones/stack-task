import { KnowledgeBasePage } from "@/components/library/kb";
import { IUrlParams } from "@/types";

export default async function Page ({ params }: IUrlParams<"kb_id">): Promise<JSX.Element> {
  const knowledgeBaseId = params.kb_id;

  return (
    <KnowledgeBasePage knowledgeBaseId={knowledgeBaseId} />
  );
}
