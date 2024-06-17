"use client";

import { useQuery } from "@tanstack/react-query";

import { useFilesContext } from "@/context";
import { IFilePickerSharedProps } from "@/types";

import { FileElement, FileSkeleton } from ".";
import { FileElementEmpty } from "./FileElementEmpty";

interface FileElementResourcesProps extends IFilePickerSharedProps {
  /**
   * The ID of the resource for which to fetch its children. If not set, fetches the root resource
   */
  resourceId?: string;
  /**
   * @default 3
   */
  skeletons?: number;
  /**
   * The Path to the current resource
   */
  resourcePath?: string;
}

export const FileElementResources = ({
  path = [],
  level = 0,
  resourceId,
  resourcePath = "/",
  skeletons = 3,
}: FileElementResourcesProps): JSX.Element => {
  const { queryOptions } = useFilesContext(path);
  const { data, isLoading } = useQuery(queryOptions({ resourceId, resourcePath }));

  return (
    isLoading
      ? (
        <>
          {
            (new Array(skeletons)).fill(1).map((_, index: number) =>
              <FileSkeleton key={`${resourceId ?? "X"}---${index}`} level={level} />,
            )
          }
        </>
      )
      : (
        <>
          {
            data
              ? data.map(d =>
                <FileElement
                  key={d.resource_id}
                  resource={d}
                  level={level}
                  // TODO -- this should be the Path or the Resource depending on the component.
                  path={[...path, d.resource_id]}
                />)
              : <FileElementEmpty />
          }
        </>
      )
  );
};
