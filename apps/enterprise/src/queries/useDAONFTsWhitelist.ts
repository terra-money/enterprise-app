import { useLCDClient } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';
import { LCDClient } from '@terra-money/feather.js';

export const fetchDAONFTsWhitelist = async (lcd: LCDClient, address: CW20Addr) => {
  const response = await lcd.wasm.contractQuery<enterprise.NftWhitelistResponse>(address, {
    nft_whitelist: {},
  });

  return response.nfts;
};

export const useDAONFTsWhitelist = (daoAddress: string) => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.NFTS_WHITELIST, daoAddress],
    async () => {
      const whitelist = await fetchDAONFTsWhitelist(lcd, daoAddress as CW20Addr);
      return whitelist;
    },
    {
      refetchOnMount: false,
    }
  );
};
