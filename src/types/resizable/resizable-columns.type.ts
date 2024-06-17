import { ComponentProps } from "react";

import { ResizableHandle, ResizablePanel } from "@/components/ui";
import { IFpeColumnSizeKeys } from "@/definitions";
import { IFilePickerIndexActions } from "@/types/files";

export interface IResizablePanelSettings {
  type: "panel";
  id: IFpeColumnSizeKeys;
  props: ComponentProps<typeof ResizablePanel>;
  actions?: (data: IFilePickerIndexActions) => any;
}

export interface IResizableHandleSettings {
  type: "handle";
  id: "";
  props: ComponentProps<typeof ResizableHandle>;
  actions?: never;
}

export type IResizableColumn = IResizablePanelSettings | IResizableHandleSettings;
