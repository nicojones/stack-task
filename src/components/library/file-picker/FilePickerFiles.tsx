"use client";

import { Checkbox, Label } from "@/components/ui";
import { useSelectedFilesContext } from "@/context";
import { ResizableWrapper } from "@/context/resizable/ResizableWrapper";

import { FileElementHeader, FileElementResources } from "./element";

export const FilePickerFiles = (): JSX.Element => {
  const { toggleAll, allSelected } = useSelectedFilesContext([]);
  const _allSelected = allSelected();

  return (
    <div className="flex flex-col space-y-4">
      <div className="fric justify-between">
        <div className="fric space-x-1">
          <Checkbox
            id="select-all-files"
            checked={_allSelected ?? "indeterminate"}
            onCheckedChange={() => toggleAll()}
          />
          <Label htmlFor="select-all-files">
            {
              _allSelected
                ? "Unselect all"
                : "Select all"
            }
          </Label>
        </div>
      </div>
      <ResizableWrapper>
        <ul
          className="space-y-2"
        >
          <li>
            <FileElementHeader />
          </li>
          <FileElementResources level={0} />
        </ul>
      </ResizableWrapper>
    </div>
  );
};
