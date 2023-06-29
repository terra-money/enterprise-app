export function removeUndefinedItems<T>(items: Array<T | undefined>): T[] {
  return items.filter((item) => item !== undefined) as T[];
}
