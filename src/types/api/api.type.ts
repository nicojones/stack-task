import { AxiosInstance, HeadersDefaults } from "axios";

export interface IApiOptions {
  token: string | null;
  signal?: AbortSignal;
  headers?: Partial<HeadersDefaults>;
}

/**
 * Returns an instance of `axios` with the defaults set.
 */
export type AxiosFactory = (options?: IApiOptions) => AxiosInstance;
