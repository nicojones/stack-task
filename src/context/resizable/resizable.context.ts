"use client";

import { createContext, useContext } from "react";

import { IResizableContext } from "@/types";

export const ResizableContext = createContext<IResizableContext>({
  layout: [],
  setLayout: () => null,

  _insideContext_: false,
});

export const useResizableContext = (): IResizableContext => {
  const context = useContext<IResizableContext>(ResizableContext);

  if (!context._insideContext_) {
    throw new Error("`useResizableContext` must be used inside of `ResizableContext`.");
  }
  return context;
};
