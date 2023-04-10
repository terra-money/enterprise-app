import { CW20Addr } from '@terra-money/apps/types';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';

type DaoQueryArguments = Extract<enterprise.QueryMsg, { dao_info: {} }>;

export const useDAOQuery = (address: CW20Addr) => {
  const { query } = useContract();

  return useQuery(
    [QUERY_KEY.DAO, address],
    async () => {
      let response = await query<DaoQueryArguments, enterprise.DaoInfoResponse>(address, {
        dao_info: {},
      });

      return response
    },
    {
      refetchOnMount: false,
    }
  );
};
