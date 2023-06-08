import { useLCDClient } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';
import { LCDClient } from '@terra-money/feather.js';

async function fetchDAONFTsWhitelist(lcd: LCDClient, address: CW20Addr): Promise<string[]> {
  let nfts: string[] = [];
  let lastNft: string | undefined;
  let response;

  do {
    response = await lcd.wasm.contractQuery<enterprise.NftWhitelistResponse>(address, {
      nft_whitelist: { start_after: lastNft },
    });

    if (response.nfts) {
      nfts = [...nfts, ...response.nfts];
      lastNft = response.nfts[response.nfts.length - 1];
    }
  } while (response.nfts && response.nfts.length !== 0)

  return nfts;
}

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
