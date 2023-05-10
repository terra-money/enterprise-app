import { useQuery, UseQueryResult } from 'react-query';
import { IBCTokensResponse } from '../../types';
import { fixTokenResponse } from '../index';
import { QUERY_KEY } from '../queryKey';
import { useNetworkName } from '../../hooks';

interface IBCTokensNetworkResponse {
  [network: string]: IBCTokensResponse;
}

export const fetchIBCTokens = async (network: string): Promise<IBCTokensResponse> => {
  const response = await fetch('https://assets.terra.money/ibc/tokens.json');

  const tokens: IBCTokensNetworkResponse = await response.json();

  return tokens && tokens[network] ? fixTokenResponse('ibc', tokens[network], (key) => `ibc/${key}`) : {};
};

export const useIBCTokensQuery = (): UseQueryResult<IBCTokensResponse> => {
  const networkName = useNetworkName();

  return useQuery(
    [QUERY_KEY.IBC_TOKENS, networkName],
    () => {
      return fetchIBCTokens(networkName);
    },
    {
      refetchOnMount: false,
    }
  );
};
