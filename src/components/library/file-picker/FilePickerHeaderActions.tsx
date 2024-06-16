import { Checkbox, Label } from "@/components/ui";
import { IFilePickerHeaderActions } from "@/types";

interface FilePickerHeaderActionsProps {
  actions: IFilePickerHeaderActions;
}

export const FilePickerHeaderActions = ({ actions }: FilePickerHeaderActionsProps): JSX.Element => {
  return (
    <>
      <Checkbox
        id="select-all-files"
        checked={actions.allSelected ?? "indeterminate"}
        onCheckedChange={() => actions.onToggle()}
      />
      <Label htmlFor="select-all-files">
        {
          actions.allSelected
            ? "Unselect all"
            : "Select all"
        }
      </Label>
    </>
  );
};
