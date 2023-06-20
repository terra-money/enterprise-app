import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { getLast } from 'lib/shared/utils/getlast';
import { withoutDuplicates } from 'lib/shared/utils/withoutDuplicates';
import { useCurrentDaoGlobalNftWhitelistQuery } from './useCurrentDaoGlobalNftWhitelistQuery';
import { fetchAll } from 'lib/shared/utils/fetchAll';

const limit = 30;

export const useCurrentDaoNftWhitelistQuery = () => {
  const { address, dao_code_version } = useCurrentDao();
  const { query } = useContract();

  const { data: globalWhitelist } = useCurrentDaoGlobalNftWhitelistQuery();

  const { data: customWhitelist } = useQuery([QUERY_KEY.CUSTOM_NFT_WHITELIST, address], async () => {
    const hasPaginatedWhitelist = Number(dao_code_version) >= 5;

    if (hasPaginatedWhitelist) {
      return fetchAll<string, string>(
        async (start_after) => {
          const { nfts } = await query<enterprise.QueryMsg, enterprise.NftWhitelistResponse>(address, {
            nft_whitelist: {
              start_after,
              limit,
            },
          });

          return nfts;
        },
        (lastPage) => (lastPage.length < limit ? null : getLast(lastPage))
      );
    }

    const { nfts } = await query<enterprise.QueryMsg, enterprise.NftWhitelistResponse>(address, {
      nft_whitelist: {},
    });

    return nfts;
  });

  console.log({
    customWhitelist,
    globalWhitelist,
  });

  if (customWhitelist && globalWhitelist) {
    return {
      data: withoutDuplicates([...globalWhitelist, ...customWhitelist]),
    };
  }

  return {
    data: undefined,
  };
};
