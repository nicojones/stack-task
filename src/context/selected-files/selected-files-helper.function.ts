import { arrayIntersection } from "@/functions";
import { IResourceAncestry } from "@/types";

/**
 * Given a list of (selected) resources ([x, y, z]), and the current resource path ([x, a] or [a, b, c])
 * returns `true` if the path is included in one of the other selected resources.
 * This is always the case when at least one of the ancestors of our resource is selected.
 */
export const resourceOrAncestorIsSelected = (resources: string[], path: string[]): boolean => {
  // console.log("checking if it contains it", { resources, path });
  for (let i = 0, len = path.length; i < len; ++i) {
    if (resources.includes(path[i])) {
      return true;
    }
  }
  return false;
};

/**
 * For a given `resourceId`, the tree ancestry information,
 * returns the subset of resources which are NOT descendants.
 */
export const getNonChildResources = (
  resourceId: string,
  ancestry: IResourceAncestry,
): string[] => {
  const resources: string[] = Object.keys(ancestry);
  const nonChildResources: string[] = [];
  for (let i = 0, len = resources.length; i < len; ++i) {
    if (
      // If a given resource is NOT a child of the current resource we are selecting:
      !ancestry[resources[i]].includes(resourceId)
    ) {
      // We add it as a main resource
      nonChildResources.push(resources[i]);
    }
  }
  return nonChildResources;
};

export const checkAllRootResourcesSelected = (resources: string[], ancestry: IResourceAncestry): boolean => {
  const rootResources: string[] = Object.keys(ancestry).filter(k => ancestry[k].length === 0);
  if (
    resources.length !== // if the number of selected resources differs from
    rootResources.length // the number of root elements
  ) {
    return false;
  }
  // Else, check that each root resource is selected. In other words:
  // resources ∩ rootResources === resources === rootResources
  return arrayIntersection(resources, rootResources).length === resources.length;
};
