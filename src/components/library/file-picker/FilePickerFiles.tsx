"use client";

import { useFilesContext } from "@/context";
import { IFilePickerHeaderActions } from "@/types";

import { FileElementHeader, FileElementResources } from "./element";

interface FilePickerFilesProps {
  children?: (actions: IFilePickerHeaderActions) => JSX.Element;
}

export const FilePickerFiles = ({ children }: FilePickerFilesProps): JSX.Element => {
  const { toggleAll, allSelected: getAllSelected } = useFilesContext([]);
  const allSelected = getAllSelected();

  return (
    <div className="flex flex-col space-y-4">
      {
        children &&
        <div className="fric justify-between">
          <div className="fric space-x-1">
            {children({ allSelected, onToggle: toggleAll })}
          </div>
        </div>
      }
      <ul
        className="space-y-2"
      >
        <li>
          <FileElementHeader />
        </li>
        <FileElementResources level={0} />
      </ul>
    </div>
  );
};
