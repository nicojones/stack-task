import { TokensIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { delay } from "@/functions";

export const PICKED_FILES_TOAST_ID = "picked-files-toast" as const;

export const pickedFilesToast = (
  numSelectedResources: number,
  onCreate: () => any,
  visible: boolean,
): void => {
  const confirmToast = (): void => {
    toast("The selected files will be indexed",
      {
        action: (
          <Button
            size="sm"
            onClick={onCreate}
            className="ml-auto"
          >Confirm
          </Button>
        ),
        id: PICKED_FILES_TOAST_ID,
        dismissible: true,
        closeButton: true,
        position: "bottom-center",
        onDismiss: () => delay(selectedItemsToast),
      },
    );
  };

  const selectedItemsToast = (): void => {
    if (numSelectedResources > 0 && visible) {
      toast(
        <div className="fric justify-between w-full z-0">
          <div className="fric space-x-2">
            <TokensIcon className="size-4" />
            <span>
              <b>{numSelectedResources}</b>{" "}
              {/* {numSelectedResources === 1 ? " resource " : " resources "} */}
              selected
            </span>
          </div>

          <Button onClick={confirmToast} size="sm">Create Knowledge Base</Button>
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

  selectedItemsToast();
};
