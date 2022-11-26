import { UseQueryResult } from "react-query";

type SwitchQueryMetadata<T> = { query: UseQueryResult<T>; enabled: boolean };

export const switchQueries = <T>(
  queries: SwitchQueryMetadata<T>[]
): UseQueryResult<T> => {
  return queries.reduce((acc, curr) => {
    return curr.enabled ? curr : acc;
  }).query;
};
