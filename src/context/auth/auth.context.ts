"use client";

import axios from "axios";
import { createContext, useContext } from "react";

import { IAuthContext } from "@/types/auth";

export const AuthContext = createContext<IAuthContext>({
  api: () => axios,

  token: null,
  setToken: () => null,

  connectionId: "",
  setConnectionId: () => null,

  _insideContext_: false,
});

export const useAuthContext = (): IAuthContext => {
  const context = useContext<IAuthContext>(AuthContext);

  if (!context._insideContext_) {
    throw new Error("`useAuthContext` must be used inside of `AuthContext`.");
  }
  return context;
};
