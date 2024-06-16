
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui";
import { useResizableContext } from "@/context/resizable/resizable.context";
import { FPE_COLUMN_SIZE } from "@/definitions";

export const FileElementHeader = (): JSX.Element => {
  const { setLayout } = useResizableContext();

  const handleLayoutChange = (layout: number[]): void => {
    setLayout(layout);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={handleLayoutChange}
      className="fric space-x-1 height-8 font-bold"
    >
      <ResizablePanel
        defaultSize={FPE_COLUMN_SIZE.file}
        minSize={FPE_COLUMN_SIZE.file / 2}
      >
        Name
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="-translate-x-2"
      />
      <ResizablePanel
        defaultSize={FPE_COLUMN_SIZE.indexed}
        maxSize={FPE_COLUMN_SIZE.createdAt * 2}
        minSize={FPE_COLUMN_SIZE.createdAt / 2}
      >
        Indexed
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="-translate-x-2"
      />
      <ResizablePanel
        defaultSize={FPE_COLUMN_SIZE.createdAt}
        maxSize={FPE_COLUMN_SIZE.createdAt * 2}
        minSize={FPE_COLUMN_SIZE.createdAt / 2}
      >
        Created At
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
