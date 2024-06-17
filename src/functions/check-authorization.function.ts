"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE_KEY } from "@/definitions";

/**
 * Redirects to the auth page if the user is not authorized (but should),
 * or
 * Redirects to the main page if the user is authorized.
 */
export async function checkAuthorization (mustBeAuthorized: boolean = true): Promise<void> {
  const cookieStore = cookies();

  const isAuthed = !!cookieStore.has(COOKIE_KEY.AUTH_TOKEN);
  if (!isAuthed && mustBeAuthorized) {
    redirect("/auth");
  } else if (isAuthed && !mustBeAuthorized) {
    redirect("/");
  }
}
