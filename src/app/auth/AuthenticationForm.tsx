"use client";

import { NotYou } from "@/components/library";
import { Input, Label } from "@/components/ui";
import { IAuthHeaderResponse } from "@/types";

import { AUTH_PASSWORD_FIELD } from "./auth-password-field";

interface AuthenticationFormProps {
  state: IAuthHeaderResponse;
}

export const AuthenticationForm = ({ state }: AuthenticationFormProps): JSX.Element => {
  return (
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
  );
};
