import { useQuery, UseQueryResult } from 'react-query';

import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

import { QUERY_KEY } from './queryKey';
import { LCDClient } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';

export const fetchDAOAssetWhitelist = async (
  lcd: LCDClient,
  address: CW20Addr
): Promise<enterprise.AssetInfoBaseFor_Addr[]> => {
  const response = await lcd.wasm.contractQuery<enterprise.AssetWhitelistResponse>(address, {
   asset_whitelist : {start_after: 2, limit: 20},
  });

  return response.assets;
};

export const useDAOAssetWhitelist= (daoAddress: string): UseQueryResult<enterprise.AssetBaseFor_Addr[]> => {
  const lcd = useLCDClient()

  return useQuery([QUERY_KEY.ASSETS_WHITELIST, daoAddress], () => fetchDAOAssetWhitelist(lcd, daoAddress as CW20Addr), {
    refetchOnMount: false,
  });
};