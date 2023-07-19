import { LCDClient } from '@terra-money/feather.js';
import { useLcdClient } from '@terra-money/wallet-kit';
import { useQuery, UseQueryResult } from 'react-query';

export interface NFTPairs {
  collectionAddress: string;
  tokenIds: any;
}

const fetchDAONFTsWhitelist = async (
  lcd: LCDClient,
  whitelistAddrCollection: string[],
  daoAddress: string
): Promise<NFTPairs[]> => {
  const nftpairs = await Promise.all(
    whitelistAddrCollection.map(async (addr: string) => {
      const tokenIds: string[] = await lcd.wasm.contractQuery(addr, {
        tokens: { owner: daoAddress },
      });
      return { collectionAddress: addr, tokenIds };
    })
  );
  return nftpairs;
};

export const useNFTsOwnersQuery = (
  whitelistAddrCollection: string[],
  daoAddress: string
): UseQueryResult<NFTPairs[]> => {
  const lcd = useLcdClient();

  return useQuery([whitelistAddrCollection, daoAddress], async () => {
    const nftpairs = await fetchDAONFTsWhitelist(lcd, whitelistAddrCollection, daoAddress);
    return nftpairs;
  });
};
