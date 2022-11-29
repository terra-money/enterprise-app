import { contractQuery } from '@terra-money/apps/queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { QUERY_KEY } from './queryKey';

export const fetchDAONFTsWhitelist = async (network: NetworkInfo, address: CW20Addr) => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.NftWhitelistResponse>(network, address, {
    nft_whitelist: {},
  });

  return response.nfts;
};

export const useDAONFTsWhitelist = (daoAddress: string) => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.NFTS_WHITELIST, daoAddress],
    async () => {
      const whitelist = await fetchDAONFTsWhitelist(network, daoAddress as CW20Addr);
      return whitelist;
    },
    {
      refetchOnMount: false,
    }
  );
};
