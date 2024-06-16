import { KnowledgeBasePage } from "@/components/library/kb";
import { IUrlParams } from "@/types";

export default async function Page ({ params }: IUrlParams<"kb_id">): Promise<JSX.Element> {
  const knowledgeBaseId = params.kb_id;

  return (
    <main className="flex min-h-screen flex-col items-center space-y-20 p-24">
      <KnowledgeBasePage knowledgeBaseId={knowledgeBaseId} />
    </main>
  );
}
