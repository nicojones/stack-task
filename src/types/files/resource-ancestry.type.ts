/**
 * For each resourceId (#ri1, #ri2, ...) stores its parents.
 * This gets added to a `ref` because it does not affect the render and it's used only for housekeeping.
 *
 * Each of the resources, when loaded (and when they access the context) index themselves:
 * ```
 * {
 *   ...
 *   [resourceId] = [#path, #to, #resourceId]
 *   ...
 * }
 * ```
 * With this information we can later clean "duplicates" (if #path and #resourceId are selected, #resourceId can be removed)
 */
export type IResourceAncestry = Record<string, string[]>;
