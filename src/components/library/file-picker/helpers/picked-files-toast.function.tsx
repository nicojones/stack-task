import { TokensIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "@/components/ui";

export const PICKED_FILES_TOAST_ID = "picked-files-toast" as const;

export const pickedFilesToast = (
  numSelectedResources: number,
  onCreate: () => any,
): void => {
  if (numSelectedResources > 0) {
    toast(
      <div className="fric justify-between w-full">
        <div className="fric space-x-2">
          <TokensIcon className="size-4" />
          <span>
            <b>{numSelectedResources}</b>
            {numSelectedResources === 1 ? " resource " : " resources "}
            selected
          </span>
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              size="sm"
            >
              Create KnowledgeBase
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create Knowledge Base?</AlertDialogTitle>
              <AlertDialogDescription>
                The selected files will be indexed and added to the Knowledge Base.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onCreate}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>,
      {
        duration: Infinity,
        id: PICKED_FILES_TOAST_ID,
        invert: true,
        position: "bottom-center",
      });
  } else {
    // If no resources are selected, we hide it.
    toast.dismiss(PICKED_FILES_TOAST_ID);
  }
};
