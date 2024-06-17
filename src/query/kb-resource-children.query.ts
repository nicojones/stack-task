import { UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { resourceFileNameSorter, toQuery } from "@/functions";
import { AxiosFactory, IConnectionResourceElement } from "@/types";

export const knowledgeBaseResourceChildrenQuery = (
  api: AxiosFactory,
  knowledgeBaseId: string,
  resourcePath?: string,
): UseQueryOptions<IConnectionResourceElement[], any> => ({
  queryKey: knowledgeBaseResourceChildrenQuery.key(knowledgeBaseId, resourcePath),
  refetchOnWindowFocus: false,
  queryFn: (): Promise<IConnectionResourceElement[]> =>
    api().get<IConnectionResourceElement[]>(
      `/knowledge_bases/${knowledgeBaseId}/resources/children${toQuery({ resource_path: resourcePath })}`,
    )
      .then(r => {
        const data = r.data;
        data.sort(resourceFileNameSorter("asc"));

        // To ensure that requests are retried while the KB is initalizing, we error
        // any request without any data
        if (!data.length) {
          throw new Error(undefined);
        }
        return data;
      })
      .catch(error => {
        if (error) {
          toast(String(error), {
            description: "Error ocurred while fetching resources",
          });
        }
        throw new Error(error);
      }),
});

knowledgeBaseResourceChildrenQuery.key = (
  knowledgeBaseId: string,
  resourcePath: string | undefined,
) =>
  ["KBResourceChildren", knowledgeBaseId, resourcePath ?? "[/root]"] as const;
