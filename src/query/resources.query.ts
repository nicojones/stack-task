import { AxiosFactory } from "@/types";
import { UseQueryOptions } from "react-query";

type MyReturnType = any;

export const resourcesQuery = (
  api: AxiosFactory,
  resourceId?: string,
): UseQueryOptions<MyReturnType, any> => ({
  queryKey: resourcesQuery.key(resourceId),
  refetchOnWindowFocus: false,
  keepPreviousData: true,
  queryFn: (): Promise<MyReturnType> =>
    api().post<MyReturnType>(
      "/some/path",
    )
      .then(r => r.data)
      .catch(error => {
        // TODO -- show toast error
        // toast.error(error);
        throw new Error(error);
      }),
});

resourcesQuery.key = (resourceId: string | undefined) =>
  ["resources", resourceId ?? "[root]"] as const;
