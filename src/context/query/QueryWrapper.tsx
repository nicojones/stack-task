"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { ComponentChildren } from "@/types";

import { getQueryClient } from "./query-client";

interface QueryWrapperProps {
  children: ComponentChildren;
}

export const QueryWrapper = ({ children }: QueryWrapperProps): JSX.Element => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};
