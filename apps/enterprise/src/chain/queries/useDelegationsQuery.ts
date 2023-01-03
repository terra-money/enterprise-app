import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useLCDClient } from '@terra-money/wallet-provider';

export const useDelegationsQuery = (delegatorAddress: string) => {
  const client = useLCDClient();

  return useQuery([QUERY_KEY.DELEGATIONS, delegatorAddress], async () => {
    // TODO: handle pagination
    const [delegations] = await client.staking.delegations(delegatorAddress);
    return delegations;
  });
};
