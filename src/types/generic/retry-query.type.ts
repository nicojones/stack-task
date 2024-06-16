import { UseQueryOptions } from "@tanstack/react-query";

export interface IUseRetryQueryProps<T extends Record<string, any>>
  extends UseQueryOptions<T> {
  /**
   * @returns `false` (stop trying) or `true` (keep trying)
   */
  retryIfConditionMetFn: (data: T, attempts: number) => boolean;
}
