import Big from 'big.js';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useVotingPowerQuery } from 'queries';

export const useDoIHaveVotingPowerQuery = () => {
  const { address } = useCurrentDao();

  const myAddress = useMyAddress();

  const { data: votingPower = Big(0), ...rest } = useVotingPowerQuery(address, myAddress);

  return {
    ...rest,
    data: votingPower.gt(0),
  };
};
