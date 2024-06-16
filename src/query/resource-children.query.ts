import { UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { resourceFileNameSorter, toQuery } from "@/functions";
import { AxiosFactory, IConnectionResourceElement } from "@/types";

export const resourceChildrenQuery = (
  api: AxiosFactory,
  connectionId: string,
  resourceId?: string,
): UseQueryOptions<IConnectionResourceElement[], any> => ({
  queryKey: resourceChildrenQuery.key(connectionId, resourceId),
  refetchOnWindowFocus: false,
  queryFn: (): Promise<IConnectionResourceElement[]> =>
    api().get<IConnectionResourceElement[]>(
      `/connections/${connectionId}/resources/children${toQuery({ resource_id: resourceId })}`,
    )
      .then(r => {
        const data = r.data;
        data.sort(resourceFileNameSorter("asc"));
        console.log(data);
        return data;
      })
      .catch(error => {
        toast(String(error), {
          description: "Error ocurred while fetching resources",
        });
        throw new Error(error);
      }),
});

resourceChildrenQuery.key = (
  connectionId: string,
  resourceId: string | undefined,
) =>
  ["resourceChildren", connectionId, resourceId ?? "[root]"] as const;
