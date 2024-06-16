import { IConnectionResourceElement, ISortFunction } from "@/types";

import { resourceFileName } from "./resource-file-name.function";

export const resourceFileNameSorter =
  (dir: "asc" | "desc"): ISortFunction<IConnectionResourceElement> => {
    const dirValue = (dir === "asc") ? [-1, 1] : [1, -1];
    return (r1: IConnectionResourceElement, r2: IConnectionResourceElement): number =>
      resourceFileName(r1).toLowerCase() < resourceFileName(r2).toLowerCase()
        ? dirValue[0]
        : dirValue[1];
  };
