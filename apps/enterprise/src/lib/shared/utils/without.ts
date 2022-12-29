export function without<T>(array: readonly T[], values: T[]): T[] {
  const set = new Set(array);

  values.forEach((value) => {
    set.delete(value);
  });

  return Array.from(set);
}
