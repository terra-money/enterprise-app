import { contractQuery } from '@terra-money/apps/queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';

import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

import { QUERY_KEY } from './queryKey';

export const fetchDAOAssetTreasury = async (
  network: NetworkInfo,
  address: CW20Addr
): Promise<enterprise.AssetBaseFor_Addr[]> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.AssetTreasuryResponse>(network, address, {
    cw20_treasury: {},
  });

  return response.assets;
};

export const useDAOAssetTreasury = (daoAddress: string): UseQueryResult<enterprise.AssetBaseFor_Addr[]> => {
  const { network } = useWallet();

  return useQuery([QUERY_KEY.CW20_TREASURY, daoAddress], () => fetchDAOAssetTreasury(network, daoAddress as CW20Addr), {
    refetchOnMount: false,
  });
};
