import { IConnectionResourceElement } from "@/types";

export const resourceFileName = (resource: IConnectionResourceElement): string =>
  resource.inode_path.path.split("/").pop() ?? resource.inode_path.path;
