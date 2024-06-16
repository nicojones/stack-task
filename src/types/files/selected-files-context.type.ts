import { IInsideContext } from "@/types";

export interface ISelectedFilesContext extends IInsideContext {
  /**
   * Returns whether the current resource has been explicitly selected.
   * @param _ Ignore this parameter when calling via hook
   */
  isChecked: (_?: string[]) => boolean;

  /**
   * Returns whether the current resource is selected
   * @param _ Ignore this parameter when calling via hook
   */
  isSelected: (_?: string[]) => boolean;

  /**
   * Selects or unselects the current resource
   * @param _ Ignore this parameter when calling via hook
   */
  selectResource: (_?: string[]) => any;
  /**
   * Selects or unselects the current resource
   * @param _ Ignore this parameter when calling via hook
   */
  unselectResource: (_?: string[]) => any;

  /**
   * Toggles all the resources
   */
  toggleAll: () => any;

  /**
   * Returns `true || false || undefined` to represent the global checked state
   */
  allSelected: () => boolean | undefined;

  /**
   * Add the current [resourceId, path] pair to the Ref. This is a write-only operation
   */
  updateResourcesTree: (path: string[]) => any;
}
