import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';
import { DaoInfo } from 'dao';

type DaoQueryArguments = Extract<enterprise.QueryMsg, { dao_info: {} }>;

export const useDAOQuery = (address: string) => {
  const { query } = useContract();

  return useQuery(
    [QUERY_KEY.DAO, address],
    async () => {
      let response = await query<DaoQueryArguments, enterprise.DaoInfoResponse>(address, {
        dao_info: {},
      });

      const daoInfo: DaoInfo = {
        ...response,
        address,
      };

      return daoInfo;
    },
    {
      refetchOnMount: false,
    }
  );
};
