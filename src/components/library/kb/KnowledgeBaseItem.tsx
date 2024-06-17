"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { CopyToClipboard } from "@/components/library";
import { FilePickerCard, FilePickerFiles } from "@/components/library/file-picker";
import { Progress } from "@/components/ui";
import { ResizableWrapper, useAuthContext, useFilesContext } from "@/context";
import { RESIZABLE_PANEL_COLUMNS_KB } from "@/definitions";
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

  const { data: _, isLoading } = useRetryQuery<IConnectionResourceElement[]>({
    ...queryOptions({ resourcePath: "/" }),
    retryIfConditionMetFn: (condition: IConnectionResourceElement[]) => {
      return condition.length === 0;
    },
  });

  return (
    <div className={loadingMask(isLoading)}>
      <FilePickerCard
        header="Knowledge Base"
        description={
          <span className="fric space-x-1">
            <span>The following files are now indexed in your Knowledge Base. ID:</span>
            <CopyToClipboard text={<kbd className="text-xs">{knowledgeBaseId}</kbd>} copyValue={knowledgeBaseId} />
          </span>
        }
      >
        {
          isLoading
            ? (
              <div className="grid place-content-center place-items-center gap-4">
                <span>Indexing files...</span>
                {/* <Image width={40} height={40} src={iconLoader} alt="Loading..." className="animate-spin size-10" /> */}
                <FakeProgress />
              </div>
            )
            : (
              <ResizableWrapper
                columns={RESIZABLE_PANEL_COLUMNS_KB}
              >
                <FilePickerFiles />
              </ResizableWrapper>
            )
        }
      </FilePickerCard>
    </div>
  );
};

/**
 * Simulate progress while the Knowledge Base is syncing/indexing and the user waits.
 */
export const FakeProgress = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(0);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (100 - p) / 1000 + p);
    }, 20);
    return () => clearInterval(interval);
  }, []);
  return <Progress value={progress} />;
};
