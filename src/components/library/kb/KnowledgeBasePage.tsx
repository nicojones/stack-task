"use client";

import { FilesWrapper, useAuthContext } from "@/context";
import { knowledgeBaseResourceChildrenQuery } from "@/query";
import { IResourceAndPath } from "@/types";

import { KnowledgeBaseItem } from "./KnowledgeBaseItem";

interface KnowledgeBasePageProps {
  knowledgeBaseId: string;
}

export const KnowledgeBasePage = ({ knowledgeBaseId }: KnowledgeBasePageProps): JSX.Element => {
  const { api } = useAuthContext();
  return (
    <FilesWrapper
      key={knowledgeBaseId}
      queryOptions={
        (data: IResourceAndPath) => knowledgeBaseResourceChildrenQuery(api, knowledgeBaseId, data.resourcePath)
      }
    >
      <KnowledgeBaseItem knowledgeBaseId={knowledgeBaseId} path={[]} />,
    </FilesWrapper>
  );
};
