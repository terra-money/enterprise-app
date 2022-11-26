import { contractQuery } from '@terra-money/apps/queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';

import { enterprise, enterprise_factory } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

import { QUERY_KEY } from './queryKey';
import { useContractAddress } from '@terra-money/apps/hooks';

export const fetchGlobalAssetsWhitelist = async (
  network: NetworkInfo,
  contractAddress: CW20Addr
): Promise<enterprise.AssetInfoBaseFor_Addr[]> => {
  const response = await contractQuery<enterprise_factory.QueryMsg, enterprise.AssetWhitelistResponse>(
    network,
    contractAddress,
    { global_asset_whitelist: {} }
  );

  return response.assets;
};

export const useGlobalAssetsWhitelist = (): UseQueryResult<enterprise.AssetInfoBaseFor_Addr[]> => {
  const { network } = useWallet();

  const contractAddress = useContractAddress('enterprise-factory');

  return useQuery(
    [QUERY_KEY.GLOBAL_ASSETS_WHITELIST, contractAddress],
    () => fetchGlobalAssetsWhitelist(network, contractAddress),
    {
      refetchOnMount: false,
    }
  );
};
