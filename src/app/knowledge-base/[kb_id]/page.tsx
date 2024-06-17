import { KnowledgeBasePage } from "@/components/library/kb";
import { checkAuthorization } from "@/functions";
import { IUrlParams } from "@/types";

export default async function Page ({ params }: IUrlParams<"kb_id">): Promise<JSX.Element> {
  await checkAuthorization();
  const knowledgeBaseId = params.kb_id;

  return (
    <KnowledgeBasePage knowledgeBaseId={knowledgeBaseId} />
  );
}
