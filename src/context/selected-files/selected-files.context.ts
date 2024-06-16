"use client";

import { createContext, useContext } from "react";

import { ISelectedFilesContext } from "@/types";

export const SelectedFilesContext = createContext<ISelectedFilesContext>({
  isChecked: () => false,
  isSelected: () => false,
  selectResource: () => null,
  unselectResource: () => null,
  toggleAll: () => null,
  updateResourcesTree: () => null,
  allSelected: () => false,

  _insideContext_: false,
});

export const useSelectedFilesContext = (path: string[]): ISelectedFilesContext => {
  const context = useContext<ISelectedFilesContext>(SelectedFilesContext);

  if (!context._insideContext_) {
    throw new Error("`useSelectedFilesContext` must be used inside of `SelectedFilesContext`.");
  }

  // Update the Ref
  context.updateResourcesTree([...path]);

  return {
    ...context,
    selectResource: () => context.selectResource([...path]),
    unselectResource: () => context.unselectResource([...path]),
    isSelected: () => context.isSelected([...path]),
    isChecked: () => context.isChecked([...path]),
  };
};
