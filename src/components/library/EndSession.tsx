import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui";
import { COOKIE_KEY } from "@/definitions";

export const EndSession = (): JSX.Element => {
  const destroySession = async (): Promise<any> => {
    "use server";
    cookies().delete(COOKIE_KEY.AUTH_TOKEN);
    redirect("/auth");
  };

  return (
    <form
      action={destroySession}
      className="fixed right-4 bottom-4"
    >
      <Button type="submit" variant="outline">End session</Button>
    </form>
  );
};
