"use client";

import { SymbolIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

import { FilePickerCard, FilePickerFiles } from "@/components/library/file-picker";
import { useAuthContext, useFilesContext } from "@/context";
import { loadingMask } from "@/functions";
import { useRetryQuery } from "@/hooks";
import { syncKnowledgeBase } from "@/resources";
import { IConnectionResourceElement } from "@/types";

interface KnowledgeBaseItemProps {
  knowledgeBaseId: string;
  path: string[];
}

export const KnowledgeBaseItem = ({ knowledgeBaseId, path }: KnowledgeBaseItemProps): JSX.Element => {
  const { api, orgId } = useAuthContext();
  const { queryOptions } = useFilesContext(path);

  useEffect(() => {
    // Run once to start the sync
    syncKnowledgeBase(api, knowledgeBaseId, orgId);
  }, [api, knowledgeBaseId, orgId]);

  const { data, isLoading } = useRetryQuery<IConnectionResourceElement[]>({
    ...queryOptions({ resourcePath: "/" }),
    retryIfConditionMetFn: (condition: IConnectionResourceElement[]) => {
      console.log("CONDITION", condition, condition.length === 0);
      return condition.length === 0;
    },
  });

  return (
    <div className={loadingMask(isLoading)}>
      <FilePickerCard
        header="Knowledge Base"
        description="Indexed files in your KB"
      >
        {
          isLoading
            ? (
              <>
                Syncing KG...
                <SymbolIcon className="animate-spin size-12" />
                <span>{JSON.stringify(data)}</span>
              </>
            )
            : (
              <FilePickerFiles />
            )
        }
      </FilePickerCard>
    </div>
  );
};
