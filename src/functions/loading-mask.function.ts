export const loadingMask = (isLoading: boolean | undefined, withLoader: boolean = false): string =>
  ` has-loading-mask ${isLoading ? "is-loading-mask" : ""} ${withLoader ? "has-spinner" : ""}`;
