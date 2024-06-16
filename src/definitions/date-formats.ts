
export const DATE_FORMATS = {
  /**
   * @example 1945-03-27 03:44:55
   */
  "ymd-hms": "YYYY-MM-DD HH:mm:ss",
  /**
   * @example 2045/02/14
   */
  ymd: "YYYY/MM/DD",
  /**
   * @example March 21, 13:44
   */
  mdhm: "MMMM DD, HH:mm",

} as const;

export type IDateFormat = keyof typeof DATE_FORMATS;
export type IDateFormatSyntax = typeof DATE_FORMATS[IDateFormat];

export const DATE_NOT_PROVIDED = "--.--.--" as const;
