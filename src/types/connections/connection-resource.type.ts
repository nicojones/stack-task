export interface IConnectionResource {
  _: any;
}

export interface IConnectionResourceElement {
  created_at: string;
  indexed_at: string;
  inode_id: string | null; // todo -- check
  inode_path: {
    /**
     * The name of the file
     */
    path: string;
  };
  inode_type: "directory" | "file";
  knowledge_base_id: string;
  modified_at: string;
  resource_id: string;
}
