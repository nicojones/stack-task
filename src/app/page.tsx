import { Button } from "@/components/ui";
import { COOKIE_KEY } from "@/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function checkAuthorization(): Promise<boolean> {
  const cookieStore = cookies();
  return cookieStore.has(COOKIE_KEY.AUTH_TOKEN);
}

export default async function FilePicker() {
  const isAuthorized = await checkAuthorization();

  if (!isAuthorized) {
    redirect("/auth");
  }

  const destroySession = async (): Promise<void> => {
    "use server";
    cookies().delete(COOKIE_KEY.AUTH_TOKEN);
    redirect("/auth");
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">You are now logged in. Yippie!</h1>

      <form
        action={destroySession}
        className="fixed right-4 bottom-4"
      >
        <Button type="submit" variant="outline">End session</Button>
      </form>
    </main>
  );
}
