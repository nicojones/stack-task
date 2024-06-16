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
    <main className="flex min-h-screen flex-col items-center space-y-20 p-24">
      <FileExplorerPage />
    </main>
  );
}
