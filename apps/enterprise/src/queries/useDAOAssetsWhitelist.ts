import { useQuery, UseQueryResult } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';
import { useLCDClient } from '@terra-money/wallet-provider';
import { LCDClient } from '@terra-money/feather.js';

export const fetchDAOAssetsWhitelist = async (
  lcd: LCDClient,
  address: CW20Addr
): Promise<enterprise.AssetInfoBaseFor_Addr[]> => {
  const response = await lcd.wasm.contractQuery<enterprise.AssetWhitelistResponse>(address, {
    asset_whitelist: {},
  });

  return response.assets;
};

export const useDAOAssetsWhitelist = (daoAddress: string): UseQueryResult<enterprise.AssetInfoBaseFor_Addr[]> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.ASSETS_WHITELIST, daoAddress],
    async () => {
      const whitelist = await fetchDAOAssetsWhitelist(lcd, daoAddress as CW20Addr);
      return whitelist;
    },
    {
      refetchOnMount: false,
    }
  );
};
