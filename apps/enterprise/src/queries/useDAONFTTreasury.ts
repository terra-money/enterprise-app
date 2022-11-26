import { contractQuery } from '@terra-money/apps/queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';

export const fetchDAONFTTreasury = async (
  network: NetworkInfo,
  address: CW20Addr
): Promise<enterprise.NftCollection[]> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.NftTreasuryResponse>(network, address, {
    nft_treasury: {},
  });

  return response.nfts;
};

export const useDAONFTTreasury = (daoAddress: string): UseQueryResult<enterprise.NftCollection[]> => {
  const { network } = useWallet();

  return useQuery([QUERY_KEY.NFT_TREASURY, daoAddress], () => fetchDAONFTTreasury(network, daoAddress as CW20Addr), {
    refetchOnMount: false,
  });
};
