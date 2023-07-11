import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { booleanMatch } from 'lib/shared/utils/match';
import { fetchAll } from 'lib/shared/utils/fetchAll';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';
import { getLast } from 'lib/shared/utils/getlast';

const limit = 30;

export const useCurrentDaoStakedNfts = () => {
  const { address, dao_type, dao_code_version } = useCurrentDao();
  const { query } = useContract();

  return useQuery([QUERY_KEY.STAKED_NFTS, address], async () => {
    if (dao_type !== 'nft') return [];

    const hasPagination = Number(dao_code_version) >= 5;

    return booleanMatch(hasPagination, {
      true: () => {
        return fetchAll<string, string>(
          async (start_after) => {
            const { nfts } = await query<enterprise.QueryMsg, enterprise.StakedNftsResponse>(address, {
              staked_nfts: {
                start_after,
                limit,
              },
            });

            return nfts;
          },
          (lastPage) => (lastPage.length < limit ? null : getLast(lastPage))
        );
      },
      false: async () => {
        // no staked nfts support for dao versions < 5
        return [];
      },
    });
  });
};
