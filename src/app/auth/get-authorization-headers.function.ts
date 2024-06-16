"use server";
import axios from "axios";
import { cookies } from "next/headers";

import { COOKIE_KEY } from "@/definitions";
import { IAuthHeaderResponse, IConnection, IGrantToken } from "@/types";

import { AUTH_PASSWORD_FIELD } from "./auth-password-field";

export const getAuthorizationHeader = async (
  _prevState: IAuthHeaderResponse,
  form: FormData,
): Promise<IAuthHeaderResponse> => {
  "use server";

  const password = (form.get(AUTH_PASSWORD_FIELD) ?? "") as string;
  console.log("Password: ", password);

  if (password) {
    try {
      const tokenResponse = await axios.post<IGrantToken>(
        `${process.env.SUPABASE_AUTH_URL}/auth/v1/token?grant_type=password`,
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
      const accessToken: string = tokenResponse.data.access_token;
      cookies().set(COOKIE_KEY.AUTH_TOKEN, accessToken);

      // Typed as `[IFoo]` instead of `IFoo[]` to indicate there's only one item returned.
      const connectionResponse = await axios.get<[IConnection]>(
        `${process.env.NEXT_PUBLIC_API_URL as string}/connections?connection_provider=gdrive&limit=1`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const connection = connectionResponse.data[0];
      console.log("Connection: ", connectionResponse.data);
      cookies().set(COOKIE_KEY.CONNECTION_ID, connection.connection_id);

      return {
        token: accessToken,
        connectionId: connection.connection_id,
        error: null,
      };
    } catch (e) {
      console.error(e);
      return {
        token: "",
        connectionId: "",
        error: String(e),
      };
    }
  }
  return {
    token: "",
    connectionId: "",
    error: "Password is required",
  };
};
