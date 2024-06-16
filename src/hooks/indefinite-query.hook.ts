import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { IUseRetryQueryProps } from "@/types";

export const useRetryQuery = <T extends Record<string, any>>({
  queryFn,
  retryIfConditionMetFn,
  queryKey,
}: IUseRetryQueryProps<T>): UseQueryResult<T> => {
  return useQuery({
    queryFn,
    queryKey,
    retry: (failureCount: number, error: any): boolean => {
      console.log("RETRY!!!?!?!?!");
      return retryIfConditionMetFn(error as T, failureCount);
    },
    retryDelay: (_retryAttempt: number): number => {
      // Optionally add a delay between retries
      return 5000;
    },
  });
};
