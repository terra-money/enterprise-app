import { useLCDClient } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';
import { LCDClient } from '@terra-money/feather.js';


async function fetchStakedNfts(lcd: LCDClient, address: CW20Addr): Promise<string[]> {
  let nfts: string[] = [];
  let lastNft: string | undefined;
  let response: enterprise.StakedNftsResponse;

  do {
    response = await lcd.wasm.contractQuery<enterprise.StakedNftsResponse>(address, {
      staked_nfts: { start_after: lastNft, limit: 100 },
    });

    if (response.nfts) {
      nfts = [...nfts, ...response.nfts];
      lastNft = response.nfts[response.nfts.length - 1];
    }
  } while (response.nfts && response.nfts.length !== 0)

  return nfts;
}

export const useStakedNfts = (daoAddress: string) => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.NFTS_WHITELIST, daoAddress],
    async () => {
      const stakedNfts = await fetchStakedNfts(lcd, daoAddress as CW20Addr);
      return stakedNfts;
    },
    {
      refetchOnMount: false,
    }
  );
};
