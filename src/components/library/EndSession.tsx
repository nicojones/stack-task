"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui";
import { COOKIE_KEY } from "@/definitions";

/**
 * Destroys the session (removes cookies) and redirects to the Authorization page.
 */
export const EndSession = (): JSX.Element => {
  const destroySession = async (): Promise<any> => {
    "use server";
    cookies().delete(COOKIE_KEY.AUTH_TOKEN);
    cookies().delete(COOKIE_KEY.CONNECTION_ID);
    redirect("/auth");
  };

  return (
    <form
      action={destroySession}
      className="fixed right-4 top-4 !m-0"
    >
      <Button type="submit" variant="ghost">Log out</Button>
    </form>
  );
};
