export function groupBy<T, K extends string>(
  items: T[],
  getKey: (item: T) => K
): Partial<Record<K, T[]>> {
  const record: Partial<Record<K, T[]>> = {};

  items.forEach((item) => {
    const key = getKey(item);

    record[key] = [...(record[key] ?? []), item] as T[];
  });

  return record;
}
