import { AxiosFactory, IInsideContext } from "@/types";

export interface IAuthContext extends IInsideContext {
  /**
   * The authorization token
   */
  token: string | null;

  /**
   * Set the value of the token
   */
  setToken: (token: string) => any;

  /**
   * API library with credentials
   */
  api: AxiosFactory;

  /**
   * The ID of the current connection
   */
  connectionId: string;

  /**
   * Set the ID of the connection
   */
  setConnectionId: (connectionId: string) => any;

  /**
   * The ID of the current organization
   * TODO -- delete if unused!
   */
  orgId: string;

  /**
   * Set the ID of the organization
   * TODO -- delete if unused!
   */
  setOrgId: (orgId: string) => any;
}
