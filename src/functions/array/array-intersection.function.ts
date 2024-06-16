/**
 * Compute the intersection between two arrays of the same type.
 */
export const arrayIntersection = <T>(array1: T[], array2: T[]): T[] => {
  const set2 = new Set(array2);
  const intersection: T[] = [];

  for (const item of array1) {
    if (set2.has(item)) {
      intersection.push(item);
    }
  }

  return intersection;
};
