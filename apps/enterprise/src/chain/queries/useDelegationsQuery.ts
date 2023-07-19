import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useLcdClient } from '@terra-money/wallet-kit';

export const useDelegationsQuery = (delegatorAddress: string) => {
  const client = useLcdClient();

  return useQuery([QUERY_KEY.DELEGATIONS, delegatorAddress], async () => {
    // TODO: handle pagination
    const [delegations] = await client.staking.delegations(delegatorAddress);
    return delegations;
  });
};
