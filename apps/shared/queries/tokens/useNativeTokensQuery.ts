import { useQuery, UseQueryResult } from "react-query";
import { LUNA, NativeTokensResponse } from "../../types";

export const useNativeTokensQuery = (
  queryName: string = "QUERY:NATIVE_TOKENS"
): UseQueryResult<NativeTokensResponse> => {
  return useQuery(
    [queryName],
    () => {
      return {
        [LUNA.key]: LUNA,
      };
    },
    {
      refetchOnMount: false,
    }
  );
};
