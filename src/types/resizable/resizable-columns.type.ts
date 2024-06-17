import { ComponentProps } from "react";

import { ResizableHandle, ResizablePanel } from "@/components/ui";
import { IColumnSizes } from "@/definitions";
import { IFilePickerIndexActions } from "@/types/files";

export interface IResizablePanelSettings<ID extends string = IColumnSizes> {
  type: "panel";
  id: ID;
  props: ComponentProps<typeof ResizablePanel>;
  actions?: (data: IFilePickerIndexActions) => any;
}

export interface IResizableHandleSettings {
  type: "handle";
  id: "";
  props: ComponentProps<typeof ResizableHandle>;
  actions?: never;
}

export type IResizableColumn<ID extends string = IColumnSizes>
  = IResizablePanelSettings<ID> | IResizableHandleSettings;
