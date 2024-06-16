export const FPE_COLUMN_SIZE = {
  file: 60,
  indexed: 10,
  createdAt: 30,
} as const;

type FpeColumnSizeKeys = keyof typeof FPE_COLUMN_SIZE;
type FpeColumnSizeValues = (typeof FPE_COLUMN_SIZE)[FpeColumnSizeKeys];

// Verify the sizes add up to 100 or less (on runtime)
const _totalSize = Object.values(FPE_COLUMN_SIZE).reduce((sum, value) => sum + value, 0);
if (_totalSize < 99.9 || _totalSize > 100.1) {
  throw new Error("Invalid sizes, must add up to 100");
}

// type Sum<T extends number[] = []> = T extends [infer F extends number, ...infer R extends number[]] ? Sum<R> : 0;

// type ValidateSum<T extends number[]> = Sum<T> extends 100 ? true : never;

// type IsValidFpeColumnSize = ValidateSum<[FpeColumnSizeValues]>;

// type MyNumbers = 3 | 4;

// type Add<A extends number, B extends number, T extends any[] = []> =
//   T["length"] extends A
//     ? [...T, ...B[]]["length"]
//     : Add<A, B, [any, ...T]>;

// type NumberAddition<A extends MyNumbers, B extends MyNumbers> = Add<A, B>;

// type Result = NumberAddition<3, 4>; // Result will be 7
// const a: Result = 8;
