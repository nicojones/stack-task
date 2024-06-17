import { KnowledgeBaseActions } from "@/components/library/kb";
import { IFilePickerIndexActions, IResizableColumn, IResizableHandleSettings } from "@/types";

import { FILES_COLUMN_SIZE, IFpeColumnSizeKeys, IKBFpeColumnSizeKeys, KB_FILES_COLUMN_SIZE } from "./file-element-column-sizes.definition";

const RESIZABLE_HANDLE: IResizableHandleSettings = {
  type: "handle",
  id: "",
  props: {
    // withHandle: true,
    className: "-translate-x-2 w-0.5 h-5 bg-slate-200 hover:bg-slate-500 transition-color",
  },
};

export const RESIZABLE_PANEL_COLUMNS_MAIN: IResizableColumn<IFpeColumnSizeKeys>[] = [
  {
    type: "panel",
    id: "file",
    props: {
      defaultSize: FILES_COLUMN_SIZE.file,
      children: "Name",
    },
  },
  {
    type: "panel",
    id: "createdAt",
    props: {
      defaultSize: FILES_COLUMN_SIZE.createdAt,
      minSize: FILES_COLUMN_SIZE.createdAt,
      children: "Created at",
    },
  },
];

export const RESIZABLE_PANEL_COLUMNS_KB: IResizableColumn<IKBFpeColumnSizeKeys>[] = [
  {
    type: "panel",
    id: "file",
    props: {
      defaultSize: KB_FILES_COLUMN_SIZE.file,
      minSize: KB_FILES_COLUMN_SIZE.file / 2,
      children: "Name",
    },
  },
  RESIZABLE_HANDLE,
  {
    type: "panel",
    id: "indexed",
    props: {
      defaultSize: KB_FILES_COLUMN_SIZE.indexed,
      maxSize: KB_FILES_COLUMN_SIZE.indexed * 2,
      minSize: KB_FILES_COLUMN_SIZE.indexed / 2,
      children: "Indexed at",
    },
  },
  RESIZABLE_HANDLE,
  {
    type: "panel",
    id: "createdAt",
    props: {
      defaultSize: KB_FILES_COLUMN_SIZE.createdAt,
      minSize: KB_FILES_COLUMN_SIZE.createdAt / 2,
      maxSize: KB_FILES_COLUMN_SIZE.createdAt * 2,
      children: "Created at",
    },
  },
  {
    type: "panel",
    id: "actions",
    props: {
      minSize: KB_FILES_COLUMN_SIZE.actions,
      maxSize: KB_FILES_COLUMN_SIZE.actions,
      children: "Actions",
    },
    actions: (data: IFilePickerIndexActions) =>
      <KnowledgeBaseActions data={data} />,

  },
];
