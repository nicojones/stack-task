import { HeadersDefaults, AxiosInstance } from "axios";

export interface IApiOptions {
  token?: string;
  signal?: AbortSignal;
  headers?: Partial<HeadersDefaults>;
}

/**
 * Returns an instance of `axios` with the defaults set.
 */
export type AxiosFactory = (options?: IApiOptions) => AxiosInstance;
