import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { FileExplorerPage } from "@/components/library";
import { COOKIE_KEY } from "@/definitions";

async function checkAuthorization (): Promise<boolean> {
  const cookieStore = cookies();
  return cookieStore.has(COOKIE_KEY.AUTH_TOKEN);
}

export default async function Page (): Promise<JSX.Element> {
  const isAuthorized = await checkAuthorization();

  if (!isAuthorized) {
    redirect("/auth");
  }

  return (
    <FileExplorerPage />
  );
}
