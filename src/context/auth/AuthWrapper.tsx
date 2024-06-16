"use client";

import Cookie from "js-cookie";
import { useMemo, useState } from "react";

import { COOKIE_KEY } from "@/definitions";
import { axiosInstance } from "@/functions";
import { ComponentChildren, IAuthContext } from "@/types";

import { AuthContext } from "./auth.context";

interface AuthWrapperProps {
  children: ComponentChildren;
}

export const AuthWrapper = ({ children }: AuthWrapperProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(Cookie.get(COOKIE_KEY.AUTH_TOKEN) ?? null);
  const [connectionId, setConnectionId] = useState<string>(Cookie.get(COOKIE_KEY.CONNECTION_ID) ?? "");

  const context = useMemo<IAuthContext>(() => ({
    token,
    setToken,
    api: () => axiosInstance({ token }),
    connectionId,
    setConnectionId,
    _insideContext_: true,
  }), [token, connectionId]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};
