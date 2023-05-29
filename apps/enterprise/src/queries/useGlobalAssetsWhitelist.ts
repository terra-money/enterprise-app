import { useQuery, UseQueryResult } from 'react-query';

import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

import { QUERY_KEY } from './queryKey';
import { useContractAddress } from '@terra-money/apps/hooks';
import { LCDClient } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';

export const fetchGlobalAssetsWhitelist = async (
  lcd: LCDClient,
  contractAddress: CW20Addr
): Promise<enterprise.AssetInfoBaseFor_Addr[]> => {
  const response = await lcd.wasm.contractQuery<enterprise.AssetWhitelistResponse>(contractAddress, {
    global_asset_whitelist: {},
  });

  return response.assets;
};

export const useGlobalAssetsWhitelist = (): UseQueryResult<enterprise.AssetInfoBaseFor_Addr[]> => {
  const lcd = useLCDClient();

  const contractAddress = useContractAddress('enterprise-factory');

  return useQuery(
    [QUERY_KEY.GLOBAL_ASSETS_WHITELIST, contractAddress],
    () => fetchGlobalAssetsWhitelist(lcd, contractAddress),
    {
      refetchOnMount: false,
    }
  );
};
