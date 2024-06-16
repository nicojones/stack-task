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
        console.log(data);
        data.sort(resourceFileNameSorter("asc"));

        data.forEach(i => {
          // @ts-expect-error invalid property
          i.full_path = i.inode_path.path;
        });
        return data;
      })
      .catch(error => {
        toast(String(error), {
          description: "Error ocurred while fetching resources",
        });
        throw new Error(error);
      }),
});

knowledgeBaseResourceChildrenQuery.key = (
  knowledgeBaseId: string,
  resourcePath: string | undefined,
) =>
  ["KBResourceChildren", knowledgeBaseId, resourcePath ?? "[/root]"] as const;
