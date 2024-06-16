import { IInsideContext } from "@/types/generic";

export interface IResizableContext extends IInsideContext {
  layout: number[];
  setLayout: (layout: number[]) => any;
}
