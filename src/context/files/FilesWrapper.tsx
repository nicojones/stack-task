"use client";

import { UseQueryOptions } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";

import { arrayIntersection, lastElementIfArray } from "@/functions";
import { ComponentChildren, IConnectionResourceElement, IFilesContext, IResourceAncestry, IResourceAndPath } from "@/types";

import { FilesContext } from "./files.context";
import { checkAllRootResourcesSelected, getNonChildResources, resourceOrAncestorIsSelected } from "./files-helper.function";

interface FilesWrapperProps {
  children: ComponentChildren;

  /**
   * Returns the {@link UseQueryOptions} data to perform the request
   */
  queryOptions: (data: IResourceAndPath) => UseQueryOptions<IConnectionResourceElement[], any>;
}

export const FilesWrapper = ({ children, queryOptions }: FilesWrapperProps): JSX.Element => {
  const [resources, setResources] = useState<string[]>([]);
  const resourceTree = useRef<IResourceAncestry>({});

  const handleSelectResource = useCallback((path: string[]): void => {
    const resourceId = lastElementIfArray(path);
    // console.log("will check now (adding)", resourceId, path);
    if (resourceId && !resourceOrAncestorIsSelected(resources, path)) {
      // console.log("will add a resource", [...resources, resourceId]);
      setResources(r => arrayIntersection([...r, resourceId], getNonChildResources(resourceId, resourceTree.current)));
    }
  }, [resources]);

  const handleUnselectResource = useCallback((path: string[]): void => {
    const resourceId = lastElementIfArray(path);
    // console.log("will check now (removing)", resourceId, path);
    if (resourceId && resourceOrAncestorIsSelected(resources, path)) {
      setResources(r => [...r.filter(_r => _r !== resourceId)]);
    }
  }, [resources]);

  const handleIsSelected = useCallback((path: string[]): boolean => {
    return resourceOrAncestorIsSelected(resources, path);
  }, [resources]);

  const handleIsChecked = useCallback((path: string[]): boolean => {
    if (resources.includes(path.pop() ?? "")) {
      return true;
    }
    return false;
  }, [resources]);

  const handleGlobalToggleState = useCallback((): boolean | undefined => {
    // No resource selected => All files are unselected
    if (resources.length === 0) {
      return false;
    }

    // All root resources selected
    if (checkAllRootResourcesSelected(resources, resourceTree.current)) {
      return true;
    }

    // Intermediate state
    return undefined;
  }, [resources]);

  const handleToggleAll = useCallback((nextState?: boolean): void => {
    const allResources: string[] = Object.keys(resourceTree.current);
    // Only the top level resources must be added
    const topLevelResources: string[] = [];
    for (let i = 0, len = allResources.length; i < len; ++i) {
      if (resourceTree.current[allResources[i]].length === 0) {
        topLevelResources.push(allResources[i]);
      }
    }
    // Finally, set as selected:
    if (nextState !== undefined) {
      setResources(
        nextState ? topLevelResources : [],
      );
    } else {
      setResources(
        resources.length === topLevelResources.length
          ? [] // Unselect all, if they were all selected
          : topLevelResources, // else, select only all the top levels
      );
    }
  }, [resources]);

  const updateResourcesTree = useCallback((path: string[]): void => {
    // Reverse the array so the current resourceId is at the beginning
    path.reverse();
    // Extract the resourceId and the rest of the path
    const [resourceId, ...restOfPath] = path;
    // Add the resource to the tree.
    if (resourceId) {
      resourceTree.current[resourceId] = [...restOfPath];
    }
  }, []);

  const context = useMemo<IFilesContext>(() => ({
    resources,
    selectResource: handleSelectResource as any, // (we know more than Typescript here, so `as any` is ok)
    unselectResource: handleUnselectResource as any, // (we know more than Typescript here, so `as any` is ok)
    isSelected: handleIsSelected as any, // (we know more than Typescript here, so `as any` is ok)
    isChecked: handleIsChecked as any, // (we know more than Typescript here, so `as any` is ok)
    toggleAll: handleToggleAll,
    allSelected: handleGlobalToggleState,
    selectedResources: resources,
    updateResourcesTree,
    queryOptions,
    _insideContext_: true,

    // Note: the other callbacks have the same dependency array so can be ommited
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [resources, queryOptions]);

  return (
    <FilesContext.Provider value={context}>
      {children}
    </FilesContext.Provider>
  );
};
