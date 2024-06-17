import { useFormStatus } from "react-dom";

import { NotYou } from "@/components/library";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { loadingMask } from "@/functions";
import { cn } from "@/lib/utils";
import { IAuthHeaderResponse } from "@/types";

import { AUTH_PASSWORD_FIELD } from "./auth-password-field";

interface VerifyCredentialsFormProps {
  state: IAuthHeaderResponse;
}

export const VerifyCredentialsForm = ({ state }: VerifyCredentialsFormProps): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <>
      <Card className={cn("w-[25rem] mx-auto", loadingMask(pending))}>
        <CardHeader>
          <CardTitle>Login required</CardTitle>
          <CardDescription>Please enter your password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                disabled
                value={process.env.NEXT_PUBLIC_AUTH_EMAIL}
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
          <Button type="submit" className="w-full" >Log In</Button>
        </CardFooter>
      </Card>
    </>
  );
};
