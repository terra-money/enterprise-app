import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { funds_distributor } from 'types/contracts';
import { useContract } from 'chain/hooks/useContract';

export const useMinimumEligibleWeightQuery = () => {
  const { funds_distributor_contract } = useCurrentDao();
  const { query } = useContract();

  return useQuery(
    [QUERY_KEY.MINIMUM_ELIGIBLE_WEIGHT, funds_distributor_contract],
    async () => {
      const { minimum_eligible_weight } = await query<
        funds_distributor.QueryMsg,
        funds_distributor.MinimumEligibleWeightResponse
      >(funds_distributor_contract, { minimum_eligible_weight: {} });

      return Number(minimum_eligible_weight);
    },
    {
      refetchOnMount: false,
    }
  );
};
