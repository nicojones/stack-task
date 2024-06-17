/**
 * Sizes for the columns in the file browser, in %
 * @note make sure they add to 100% to avoid Cumulative Layout Shifts!
 */
export const FILES_COLUMN_SIZE = {
  file: 80,
  createdAt: 20,
} as const;

/**
 * Sizes for the columns in the KB browser, in %
 * @note make sure they add to 100% to avoid Cumulative Layout Shifts!
 */
export const KB_FILES_COLUMN_SIZE = {
  file: 50,
  indexed: 20,
  createdAt: 20,
  actions: 10,
} as const;

export type IFpeColumnSizeKeys = keyof typeof FILES_COLUMN_SIZE;
export type IKBFpeColumnSizeKeys = keyof typeof KB_FILES_COLUMN_SIZE;

export type IColumnSizes = IFpeColumnSizeKeys | IKBFpeColumnSizeKeys;
