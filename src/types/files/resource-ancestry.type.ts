/**
 * For each resourceId (#ri1, #ri2, ...) we store its parents.
 * This gets added to a `ref` because it does not belong to the render cycle and it's used only for housekeeping.
 *
 * Each of the resources, when loaded (i.e. when they access the context) index themselves:
 * ```
 * {
 *   ...
 *   [resourceId] = [#path, #to, #resourceId]
 *   ...
 * }
 * ```
 * With this information we can later clean "duplicates" (e.g. if #path and #resourceId are selected, #resourceId can be removed)
 */
export type IResourceAncestry = Record<string, string[]>;
