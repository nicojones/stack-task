
import { FileExplorerPage } from "@/components/library";
import { checkAuthorization } from "@/functions";

export default async function Page (): Promise<JSX.Element> {
  await checkAuthorization();

  return (
    <FileExplorerPage />
  );
}
