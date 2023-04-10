import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useVotingPowerQuery } from 'queries';

export const useDoIHaveVotingPowerQuery = () => {
  const { enterprise_factory_contract } = useCurrentDao();

  const connectedWallet = useConnectedWallet();

  const { data: votingPower = Big(0), ...rest } = useVotingPowerQuery(enterprise_factory_contract, connectedWallet?.walletAddress);

  return {
    ...rest,
    data: votingPower.gt(0)
  }
};
