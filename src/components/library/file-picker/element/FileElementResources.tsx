"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthContext } from "@/context";
import { resourceChildrenQuery } from "@/query";
import { IFilePickerSharedProps } from "@/types";

import { FileElement, FileSkeleton } from ".";
import { FileElementEmpty } from "./FileElementEmpty";

interface FilePickerFilesProps extends IFilePickerSharedProps {
  /**
   * The ID of the resource for which to fetch its children. If not set, fetches the root resource
   */
  resourceId?: string;
  /**
   * @default 3
   */
  skeletons?: number;

}

export const FileElementResources = ({
  path = [],
  level = 0,
  resourceId,
  skeletons = 3,
}: FilePickerFilesProps): JSX.Element => {
  const { api, connectionId } = useAuthContext();
  const { data, isLoading } = useQuery(resourceChildrenQuery(api, connectionId, resourceId));

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
                  path={[...path, d.resource_id]}
                />)
              : <FileElementEmpty />
          }
        </>
      )
  );
};
