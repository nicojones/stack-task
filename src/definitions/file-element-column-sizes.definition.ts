export const FPE_COLUMN_SIZE = {
  file: 60,
  indexed: 10,
  createdAt: 20,
  actions: 10,
} as const;

export type IFpeColumnSizeKeys = keyof typeof FPE_COLUMN_SIZE;

// Verify the sizes add up to 100 or less (on runtime)
const _totalSize = Object.values(FPE_COLUMN_SIZE).reduce((sum, value) => sum + value, 0);
if (_totalSize < 99.9 || _totalSize > 100.1) {
  throw new Error("Invalid sizes, must add up to 100");
}
