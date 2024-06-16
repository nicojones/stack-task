"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { FilesWrapper, useAuthContext } from "@/context";
import { loadingMask } from "@/functions";
import { cn } from "@/lib/utils";
import { resourceChildrenQuery } from "@/query";

import { FilePickerCard } from "./FilePickerCard";
import { FilePickerFiles } from "./FilePickerFiles";
import { FilePickerHeaderActions } from "./FilePickerHeaderActions";
import { FilePickerKbCreator } from "./FilePickerKBCreator";

export const FileExplorerPage = (): JSX.Element => {
  const { api, connectionId } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateKnowledgeBase = useCallback((newKnowledgeBaseId: string): void => {
    router.push(`/knowledge-base/${newKnowledgeBaseId}`);
  }, [router]);

  return (
    <>
      <div
        className={cn(
          "grid place-content-center place-items-center drop-shadow-2xl",
          loadingMask(loading),
        )}
      >
        <FilesWrapper
          queryOptions={({ resourceId }) => resourceChildrenQuery(api, connectionId, resourceId)}
        >
          <FilePickerCard
            header="Files"
            description="Index and de-index files in the Knowledge Base"
          >
            <FilePickerKbCreator
              onCreateKb={handleCreateKnowledgeBase}
              setLoading={setLoading}
            >
              <FilePickerFiles>
                {(actions) => <FilePickerHeaderActions actions={actions} />}
              </FilePickerFiles>
            </FilePickerKbCreator>
          </FilePickerCard>
        </FilesWrapper>

      </div>
    </>
  );
};
