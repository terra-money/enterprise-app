import Big from 'big.js';

import { useCW721NumTokensQuery, useCW721ContractInfoQuery, useNFTStakingAmountQuery } from 'queries';

export const useNftDaoStakingInfo = (daoAddress: string, tokenAddress: string) => {
  const { data: info, isLoading: isLoadingInfo } = useCW721ContractInfoQuery(tokenAddress);

  const { data: numTokens = Big(0), isLoading: isLoadingNumTokens } = useCW721NumTokensQuery(tokenAddress);

  const { data: totalStaked = Big(0) as Big } = useNFTStakingAmountQuery(daoAddress);

  const totalStakedPercent = Big(numTokens).eq(0) ? Big(0) : totalStaked.div(numTokens ?? 0).mul(100);

  return {
    isLoading: isLoadingInfo || isLoadingNumTokens,
    totalStaked,
    totalStakedPercent,
    numTokens,
    symbol: info?.symbol ?? '',
  };
};
