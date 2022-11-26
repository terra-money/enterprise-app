import {
  useCW20TokensQuery,
  useIBCTokensQuery,
  useNativeTokensQuery,
} from "../queries";
import { useMemo } from "react";
import { Token } from "../types";

export type Tokens = Record<string, Token>;

type TokensResponse = {
  tokens: Tokens;
  isLoading: boolean;
};

export const useTokens = (): TokensResponse => {
  const { data: nativeTokens, isLoading: isLoadingNative } =
    useNativeTokensQuery();

  const { data: cw20Tokens, isLoading: isLoadingCw20 } = useCW20TokensQuery();
  const { data: ibcTokens, isLoading: isLoadingIbc } = useIBCTokensQuery();

  return useMemo(() => {
    if (nativeTokens && cw20Tokens && ibcTokens) {
      return {
        tokens: {
          ...nativeTokens,
          ...cw20Tokens,
          ...ibcTokens,
        },
        isLoading: false,
      };
    }
    return {
      tokens: {},
      isLoading: isLoadingNative || isLoadingCw20 || isLoadingIbc,
    };
  }, [
    nativeTokens,
    cw20Tokens,
    ibcTokens,
    isLoadingNative,
    isLoadingCw20,
    isLoadingIbc,
  ]);
};
