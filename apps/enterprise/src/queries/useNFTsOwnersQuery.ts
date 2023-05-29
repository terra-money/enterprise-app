import { CW20Addr } from '@terra-money/apps/types';
import { LCDClient } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';

export interface NFTPairs {
  collectionAddress: string;
  tokenIds: any;
}

const fetchDAONFTsWhitelist = async (
  lcd: LCDClient,
  whitelistAddrCollection: CW20Addr[],
  daoAddress: string
): Promise<NFTPairs[]> => {
  const nftpairs = await Promise.all(
    whitelistAddrCollection.map(async (addr: CW20Addr) => {
      const tokenIds: string[] = await lcd.wasm.contractQuery(addr, {
        tokens: { owner: daoAddress },
      });
      return { collectionAddress: addr, tokenIds };
    })
  );
  return nftpairs;
};

export const useNFTsOwnersQuery = (
  whitelistAddrCollection: CW20Addr[],
  daoAddress: string
): UseQueryResult<NFTPairs[]> => {
  const lcd = useLCDClient();

  return useQuery([whitelistAddrCollection, daoAddress], async () => {
    const nftpairs = await fetchDAONFTsWhitelist(lcd, whitelistAddrCollection, daoAddress);
    return nftpairs;
  });
};
