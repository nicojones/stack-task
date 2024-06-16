/**
 * The names (keys) of the cookies stored in the system
 */
export const COOKIE_KEY = {
  AUTH_TOKEN: "token",
  CONNECTION_ID: "conn_id",
} as const;

type ICookieAccessor = keyof typeof COOKIE_KEY;
export type ICookieKey = (typeof COOKIE_KEY)[ICookieAccessor];
