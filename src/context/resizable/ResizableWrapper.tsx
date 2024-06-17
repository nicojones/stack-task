"use client";

import { useCallback, useMemo, useState } from "react";

import { FILES_COLUMN_SIZE, IColumnSizes } from "@/definitions";
import { ComponentChildren, IResizableColumn, IResizableContext, IResizablePanelSettings } from "@/types";

import { ResizableContext } from "./resizable.context";

interface ResizableWrapperProps {
  children: ComponentChildren;
  readonly columns: IResizableColumn[];
}

export const ResizableWrapper = ({ children, columns }: ResizableWrapperProps): JSX.Element => {
  const [widths, setWidths] = useState<number[]>(Object.values(FILES_COLUMN_SIZE));

  const hasColumn = useCallback(
    (columnName: IColumnSizes): boolean =>
      !!columns.find(c => (c as IResizablePanelSettings).id === columnName),
    [columns],
  );

  const context = useMemo<IResizableContext>(() => ({
    widths,
    setWidths,
    _insideContext_: true,
    columns,
    hasColumn,
  }), [widths, columns, hasColumn]);

  return (
    <ResizableContext.Provider value={context}>
      {children}
    </ResizableContext.Provider>
  );
};
