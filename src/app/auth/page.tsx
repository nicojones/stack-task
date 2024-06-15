import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NotYou } from "@/components/library";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { COOKIE_KEY } from "@/definitions";

export default function VerifyCredentialsPage (): JSX.Element {
  const getAuthorizationHeader = async (form: FormData): Promise<any> => {
    "use server";
    const password = (form.get("password") ?? "") as string;
    console.log("Password: ", password);
    if (password) {
      try {
        const response = await axios.post(
          `${process.env.SUPABASE_AUTH_URL as string}/auth/v1/token?grant_type=password`,
          {
            email: process.env.AUTH_EMAIL,
            password,
            gotrue_meta_security: {},
          },
          {
            headers: {
              "Content-Type": "application/json",
              Apikey: process.env.SUPABASE_ANON_KEY,
            },
          },
        );
        cookies().set(COOKIE_KEY.AUTH_TOKEN, response.data.access_token);
      } catch (e) {
        // todo -- handle error
      }
    }
  };

  if (cookies().get(COOKIE_KEY.AUTH_TOKEN)) {
    redirect("/");
  }

  return (
    <form
      action={getAuthorizationHeader}
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
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                autoFocus
                autoComplete="off"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Authorize</Button>
        </CardFooter>
      </Card>

      <input value="!z4ZnxkyLYs#vR" />
    </form>
  );
}
