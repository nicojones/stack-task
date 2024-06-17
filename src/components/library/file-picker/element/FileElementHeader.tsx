
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui";
import { useResizableContext } from "@/context/resizable/resizable.context";
import { IResizableColumn } from "@/types";

export const FileElementHeader = (): JSX.Element => {
  const { setWidths, columns } = useResizableContext();

  const handleLayoutChange = (layout: number[]): void => {
    setWidths(layout);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={handleLayoutChange}
      className="fric space-x-1 height-8 font-semibold text-sm"
    >
      {
        columns.map((c: IResizableColumn, index: number) =>
          c.type === "panel"
            ? (
              <ResizablePanel key={index} {...c.props} />
            )
            : (
              <ResizableHandle key={index} {...c.props} />
            ),
        )
      }
    </ResizablePanelGroup>
  );
};
