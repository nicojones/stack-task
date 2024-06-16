"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { NotYou } from "@/components/library";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { useAuthContext } from "@/context";
import { IAuthHeaderResponse } from "@/types";

import { AUTH_PASSWORD_FIELD } from "./auth-password-field";
import { getAuthorizationHeader } from "./get-authorization-headers.function";

const initialState: IAuthHeaderResponse = {
  token: "",
  connectionId: "",
  error: null,
};

export default function VerifyCredentialsPage (): JSX.Element {
  const { setToken, setConnectionId } = useAuthContext();
  const [state, formAction] = useFormState(getAuthorizationHeader, initialState);

  useEffect(() => {
    if (state.connectionId && state.token) {
      setToken(state.token);
      setConnectionId(state.connectionId);
      redirect("/");
    }
  }, [state, setToken, setConnectionId]);

  // TODO -- indicate loader using `useForm` hook or similar
  return (
    <form
      action={formAction}
      className="w-screen grid place-content-center place-items-center min-h-screen"
    >
      <Card className="w-[25rem] mx-auto">
        <CardHeader>
          <CardTitle>Authorization required</CardTitle>
          <CardDescription>Please enter your password to authorize the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                disabled
                value={process.env.AUTH_EMAIL}
              />
              <NotYou label="Use a different login" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={AUTH_PASSWORD_FIELD}>Password</Label>
              <Input
                type="password"
                name={AUTH_PASSWORD_FIELD}
                required
                autoFocus
                autoComplete="off"
              />
              {
                state.error && <small className="text-red-500">{state.error}</small>
              }
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Authorize</Button>
        </CardFooter>
      </Card>

      <input value="!z4ZnxkyLYs#vR" readOnly onClick={e => e.currentTarget.select()}/>
    </form>
  );
}
