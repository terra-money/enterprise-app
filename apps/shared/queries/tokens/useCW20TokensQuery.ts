import { useQuery, UseQueryResult } from 'react-query';
import { CW20TokensResponse } from '../../types';
import { fixTokenResponse } from '../utils';
import { QUERY_KEY } from '../queryKey';
import { useNetworkName } from '../../hooks';

interface CW20TokensNetworkResponse {
  [network: string]: CW20TokensResponse;
}

const fetchCW20Tokens = async (network: string): Promise<CW20TokensResponse> => {
  const response = await fetch('https://assets.terra.money/cw20/tokens.json');

  const tokens: CW20TokensNetworkResponse = await response.json();

  return tokens && tokens[network] ? fixTokenResponse('cw20', tokens[network]) : {};
};

export const useCW20TokensQuery = (): UseQueryResult<CW20TokensResponse> => {
  const networkName = useNetworkName()

  return useQuery(
    QUERY_KEY.CW20_TOKENS,
    () => {
      return fetchCW20Tokens(networkName);
    },
    {
      refetchOnMount: false,
    }
  );
};
