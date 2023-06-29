import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise_factory } from 'types/contracts';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const useCurrentDaoGlobalNftWhitelistQuery = () => {
  const { address, enterprise_factory_contract } = useCurrentDao();
  const { query } = useContract();

  return useQuery([QUERY_KEY.GLOBAL_NFT_WHITELIST, address], async () => {
    const { nfts } = await query<enterprise_factory.QueryMsg, enterprise_factory.NftWhitelistResponse>(
      enterprise_factory_contract,
      { global_nft_whitelist: {} }
    );

    return nfts;
  });
};
