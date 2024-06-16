import axios, { AxiosInstance, AxiosResponseHeaders } from "axios";

import { AxiosFactory, IApiOptions } from "@/types";

export const axiosInstance: AxiosFactory = (options?: IApiOptions): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // responseType: "json",
    signal: options?.signal,
    headers: {
      common: {
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      post: {
        "Content-Type": "application/json",
      },
      ...(options?.headers ?? {}),
    },
    /**
     * Verify that the response is not invalid due to an expired_token status.
     */
    transformResponse: [
      (data: string, _headers: AxiosResponseHeaders, _status?: number) => {
        try {
          return JSON.parse(data);
        } catch (e) {
          // TODO -- handle errors
          console.error(e);
          throw new Error("Invalid JSON response");
        }
      },
    ],
  });
