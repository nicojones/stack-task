import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { useAuthContext } from "@/context";
import { toQuery } from "@/functions";
import { IFilePickerIndexActions } from "@/types";

interface KnowledgeBaseActionsProps {
  data: IFilePickerIndexActions;
}

const CONFIRM_TOAST_ID = "confirm-deindex";

export const KnowledgeBaseActions = ({ data }: KnowledgeBaseActionsProps): JSX.Element => {
  const { api } = useAuthContext();

  const handleDeindexResource = (): void => {
    toast.dismiss(CONFIRM_TOAST_ID);
    const query = toQuery({ resource_path: data.resource.inode_path.path });
    api()
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL as string}/knowledge_bases/${data.knowledgeBaseId}/resources${query}`,
      )
      .then(r => r.data)
      .catch(e => {
        toast.error(String(e));
      });
  };

  const handleConfirmDeindexResource = (): void => {
    toast("Remove from the Knowledge Base?", {
      action: (
        <Button size="sm" className="ml-auto" onClick={handleDeindexResource}>Remove</Button>
      ),
      dismissible: true,
      closeButton: true,
      id: CONFIRM_TOAST_ID,
    });
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleConfirmDeindexResource}>
      <TrashIcon className="size-3" />
    </Button>
  );
};
