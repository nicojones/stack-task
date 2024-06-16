"use client";

import { useMemo, useState } from "react";

import { FPE_COLUMN_SIZE } from "@/definitions";
import { ComponentChildren, IResizableContext } from "@/types";

import { ResizableContext } from "./resizable.context";

interface ResizableWrapperProps {
  children: ComponentChildren;
}

export const ResizableWrapper = ({ children }: ResizableWrapperProps): JSX.Element => {
  const [layout, setLayout] = useState<number[]>(Object.values(FPE_COLUMN_SIZE));

  const context = useMemo<IResizableContext>(() => ({
    layout,
    setLayout,
    _insideContext_: true,
  }), [layout]);

  return (
    <ResizableContext.Provider value={context}>
      {children}
    </ResizableContext.Provider>
  );
};
