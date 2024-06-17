"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { useAuthContext } from "@/context";
import { delay } from "@/functions";
import { IAuthHeaderResponse } from "@/types";

import { getAuthorizationHeader } from "./get-authorization-headers.function";
import { VerifyCredentialsForm } from "./VerifyCredentialsForm";

const LOGGING_IN_TOAST_ID = "logging-in-toast";

const INITIAL_STATE: IAuthHeaderResponse = {
  token: "",
  connectionId: "",
  orgId: "",
  error: null,
};

export default function Page (): JSX.Element {
  const { setToken, setConnectionId, setOrgId } = useAuthContext();
  const [state, formAction] = useFormState(getAuthorizationHeader, INITIAL_STATE);

  const handleFormSubmit = (): void => {
    toast.loading("Logging you in...", { id: LOGGING_IN_TOAST_ID });
  };

  useEffect(() => {
    if (state.connectionId && state.token) {
      // Greet the user
      toast.success("Welcome back!", { id: LOGGING_IN_TOAST_ID });
      delay(() => toast.dismiss(LOGGING_IN_TOAST_ID), 1000);
      // Store the Auth state
      setToken(state.token);
      setConnectionId(state.connectionId);
      setOrgId(state.orgId);
      // Redirect
      redirect("/");
    } else {
      toast.dismiss(LOGGING_IN_TOAST_ID);
    }
  }, [state, setToken, setConnectionId, setOrgId]);

  return (
    <form
      action={formAction}
      onSubmit={handleFormSubmit}
      className="w-screen grid place-content-center place-items-center min-h-screen"
    >
      <VerifyCredentialsForm state={state} />
    </form>
  );
}
