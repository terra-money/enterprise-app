import { contractQuery } from '@terra-money/apps/queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';

export const fetchDAOAssetsWhitelist = async (
  network: NetworkInfo,
  address: CW20Addr
): Promise<enterprise.AssetInfoBaseFor_Addr[]> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.AssetWhitelistResponse>(network, address, {
    asset_whitelist: {},
  });

  return response.assets;
};

export const useDAOAssetsWhitelist = (daoAddress: string): UseQueryResult<enterprise.AssetInfoBaseFor_Addr[]> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.ASSETS_WHITELIST, daoAddress],
    async () => {
      const whitelist = await fetchDAOAssetsWhitelist(network, daoAddress as CW20Addr);
      return whitelist;
    },
    {
      refetchOnMount: false,
    }
  );
};
