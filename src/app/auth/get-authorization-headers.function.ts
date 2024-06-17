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

  if (password) {
    try {
      const tokenResponse = await axios.post<IGrantToken>(
        `${process.env.SUPABASE_AUTH_URL as string}/auth/v1/token?grant_type=password`,
        {
          email: process.env.NEXT_PUBLIC_AUTH_EMAIL,
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
      cookies().set(COOKIE_KEY.CONNECTION_ID, connection.connection_id);
      cookies().set(COOKIE_KEY.ORG_ID, connection.org_id);

      return {
        token: accessToken,
        connectionId: connection.connection_id,
        orgId: connection.org_id,
        error: null,
      };
    } catch (e) {
      console.error(e);
      return {
        token: "",
        connectionId: "",
        orgId: "",
        error: String(e),
      };
    }
  }
  return {
    token: "",
    connectionId: "",
    orgId: "",
    error: "Password is required",
  };
};
