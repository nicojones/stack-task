import { KnowledgeBaseActions } from "@/components/library/kb";
import { IFilePickerIndexActions, IResizableColumn, IResizableHandleSettings } from "@/types";

import { FPE_COLUMN_SIZE } from "./file-element-column-sizes.definition";

const RESIZABLE_HANDLE: IResizableHandleSettings = {
  type: "handle",
  id: "",
  props: {
    withHandle: true,
    className: "-translate-x-2",
  },
};

export const RESIZABLE_PANEL_COLUMNS_MAIN: IResizableColumn[] = [
  {
    type: "panel",
    id: "file",
    props: {
      defaultSize: FPE_COLUMN_SIZE.file,
      minSize: FPE_COLUMN_SIZE.file / 2,
      children: "Name",
    },
  },
  RESIZABLE_HANDLE,
  {
    type: "panel",
    id: "createdAt",
    props: {
      defaultSize: FPE_COLUMN_SIZE.createdAt,
      minSize: FPE_COLUMN_SIZE.createdAt / 2,
      maxSize: FPE_COLUMN_SIZE.createdAt * 2,
      children: "Created at",
    },
  },
];

export const RESIZABLE_PANEL_COLUMNS_KB: IResizableColumn[] = [
  {
    type: "panel",
    id: "file",
    props: {
      defaultSize: FPE_COLUMN_SIZE.file,
      minSize: FPE_COLUMN_SIZE.file / 2,
      children: "Name",
    },
  },
  RESIZABLE_HANDLE,
  {
    type: "panel",
    id: "indexed",
    props: {
      defaultSize: FPE_COLUMN_SIZE.indexed,
      maxSize: FPE_COLUMN_SIZE.indexed * 2,
      minSize: FPE_COLUMN_SIZE.indexed / 2,
      children: "Indexed at",
    },
  },
  RESIZABLE_HANDLE,
  {
    type: "panel",
    id: "createdAt",
    props: {
      defaultSize: FPE_COLUMN_SIZE.createdAt,
      minSize: FPE_COLUMN_SIZE.createdAt / 2,
      maxSize: FPE_COLUMN_SIZE.createdAt * 2,
      children: "Created at",
    },
  },
  RESIZABLE_HANDLE,
  {
    type: "panel",
    id: "actions",
    props: {
      minSize: FPE_COLUMN_SIZE.actions,
      maxSize: FPE_COLUMN_SIZE.actions,
      children: "Actions",
    },
    actions: (data: IFilePickerIndexActions) =>
      <KnowledgeBaseActions data={data} />,

  },
];
