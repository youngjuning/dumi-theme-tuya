export const getArray = <T>(array: T[] | undefined): T[] =>
  Array.isArray(array) ? array : [];

/**
 * 对象数组去重
 */
export const dedup = <T>(array: T[], compare: (a: T, b: T) => boolean) =>
  array.reduce(
    (acc, item) => (acc.find(i => compare(i, item)) ? acc : acc.concat(item)),
    [] as T[],
  );
