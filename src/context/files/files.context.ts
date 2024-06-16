"use client";

import { UseQueryOptions } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import { IFilesContext } from "@/types";

export const FilesContext = createContext<IFilesContext>({
  isChecked: () => false,
  isSelected: () => false,
  selectResource: () => null,
  unselectResource: () => null,
  toggleAll: () => null,
  updateResourcesTree: () => null,
  allSelected: () => false,
  selectedResources: [],
  queryOptions: () => ({} as unknown as UseQueryOptions<any>),

  _insideContext_: false,
});

export const useFilesContext = (path: string[]): IFilesContext => {
  const context = useContext<IFilesContext>(FilesContext);

  if (!context._insideContext_) {
    throw new Error("`useFilesContext` must be used inside of `IFilesContext`.");
  }

  // Update the Ref for each of the elements that are added to our tree.
  context.updateResourcesTree([...path]);

  return {
    ...context,
    selectResource: () => context.selectResource([...path]),
    unselectResource: () => context.unselectResource([...path]),
    isSelected: () => context.isSelected([...path]),
    isChecked: () => context.isChecked([...path]),
  };
};
