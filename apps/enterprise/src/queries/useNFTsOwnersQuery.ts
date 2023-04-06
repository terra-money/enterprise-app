import { contractQuery } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';

export interface NFTPairs {
  collectionAddress: string;
  tokenIds: any;
}


const fetchDAONFTsWhitelist = async (
    network: NetworkInfo,
    whitelistAddrCollection: CW20Addr[],
    daoAddress: string,
  ): Promise<NFTPairs[]> => {
    const nftpairs = await Promise.all(
      whitelistAddrCollection.map(async (addr: CW20Addr) => {
        const tokenIds: string[]  = await contractQuery(network, addr, {
          tokens: { owner: daoAddress },
        });
        return { collectionAddress: addr, tokenIds };
      }),
    );
    return nftpairs;
  };

export const useNFTsOwnersQuery = (
  whitelistAddrCollection: CW20Addr[],
  daoAddress: string,
): UseQueryResult<NFTPairs[]> => {
  const { network } = useWallet();
  return useQuery([whitelistAddrCollection, daoAddress], async () => {
    const nftpairs = await fetchDAONFTsWhitelist(
      network,
      whitelistAddrCollection,
      daoAddress,
    );
    return nftpairs;
  });
};
