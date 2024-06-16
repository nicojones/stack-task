export const loadingMask = (isLoading: boolean | undefined, isFetching = false): string =>
  ` has-loading-mask ${isLoading ? "is-loading-mask" : ""} ${isFetching ? "cursor-wait" : ""}`;
