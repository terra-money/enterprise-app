import { useQuery, UseQueryResult } from 'react-query';

import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

import { QUERY_KEY } from './queryKey';
import { LCDClient } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';

export const fetchDAOAssetTreasury = async (
  lcd: LCDClient,
  address: CW20Addr
): Promise<enterprise.AssetBaseFor_Addr[]> => {
  const response = await lcd.wasm.contractQuery<enterprise.AssetTreasuryResponse>(address, {
    cw20_treasury: {},
  });

  return response.assets;
};

export const useDAOAssetTreasury = (daoAddress: string): UseQueryResult<enterprise.AssetBaseFor_Addr[]> => {
  const lcd = useLCDClient()

  return useQuery([QUERY_KEY.CW20_TREASURY, daoAddress], () => fetchDAOAssetTreasury(lcd, daoAddress as CW20Addr), {
    refetchOnMount: false,
  });
};
