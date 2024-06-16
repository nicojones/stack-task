import { UseQueryOptions } from "@tanstack/react-query";

import { toQuery } from "@/functions";
import { AxiosFactory } from "@/types";

type MyReturnType = any;

export const resourceDataQuery = (
  api: AxiosFactory,
  connectionId: string,
  resourceId: string,
): UseQueryOptions<MyReturnType, any> => ({
  queryKey: resourceDataQuery.key(connectionId, resourceId),
  refetchOnWindowFocus: false,
  queryFn: (): Promise<MyReturnType> =>
    api().get<MyReturnType>(
      `/connections/${connectionId}/resources${toQuery({ resource_id: resourceId })}`,
    )
      .then(r => r.data)
      .catch(error => {
        // TODO -- show toast error
        // toast.error(error);
        throw new Error(error);
      }),
});

resourceDataQuery.key = (
  connectionId: string,
  resourceId: string | undefined,
) =>
  ["resourceData", connectionId, resourceId] as const;
