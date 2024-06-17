
import { IFpeColumnSizeKeys } from "@/definitions";
import { IInsideContext } from "@/types/generic";

import { IResizableColumn } from "./resizable-columns.type";

export interface IResizableContext extends IInsideContext {
  /**
   * Widths for the different columns
   */
  widths: number[];
  /**
   * Update the widths of the different columns
   */
  setWidths: (layout: number[]) => any;
  /**
   * Define the columns
   */
  columns: IResizableColumn[];
  /**
   * Returns `true` if the column is defined
   */
  hasColumn: (columnName: IFpeColumnSizeKeys) => boolean;
}
