import { UseQueryResult } from "react-query";

export const mergeQueries = <T>(
  queries: UseQueryResult<T>[],
  mergeData: (acc: T, curr: T) => T
): UseQueryResult<T> => {
  return queries.reduce((acc, curr) => {
    return {
      ...acc,
      isLoading: acc.isLoading || curr.isLoading,
      data: acc.data && curr.data && mergeData(acc.data, curr.data),
    } as UseQueryResult<T>;
  }) as UseQueryResult<T>;
};
