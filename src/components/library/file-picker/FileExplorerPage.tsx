"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { FilesWrapper, ResizableWrapper, useAuthContext } from "@/context";
import { RESIZABLE_PANEL_COLUMNS_MAIN } from "@/definitions";
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

  const handleAfterKnowledgeBaseCreate = useCallback((newKnowledgeBaseId: string): void => {
    router.push(`/knowledge-base/${newKnowledgeBaseId}`);
  }, [router]);

  return (
    <>
      <div
        className={cn(
          "flex justify-center items-center drop-shadow-2xl w-full",
          loadingMask(loading, true),
        )}
      >
        <FilesWrapper
          queryOptions={({ resourceId }) => resourceChildrenQuery(api, connectionId, resourceId)}
        >
          <FilePickerCard
            header="File System"
            description="Select the files you would like to add to your Stack AI workflow's Knowledge Base"
            footer={(
              <small className="mr-auto text-slate-400 fric space-x-2">
                <InfoCircledIcon className="size-3" />
                <span>We recommend selecting as few items as needed</span>
              </small>
            )}
          >
            <FilePickerKbCreator
              onCreateKb={handleAfterKnowledgeBaseCreate}
              setLoading={setLoading}
              loading={loading}
            >
              <ResizableWrapper
                columns={RESIZABLE_PANEL_COLUMNS_MAIN}
              >
                <FilePickerFiles>
                  {(actions) => <FilePickerHeaderActions actions={actions} />}
                </FilePickerFiles>
              </ResizableWrapper>
            </FilePickerKbCreator>
          </FilePickerCard>
        </FilesWrapper>

      </div>
    </>
  );
};
