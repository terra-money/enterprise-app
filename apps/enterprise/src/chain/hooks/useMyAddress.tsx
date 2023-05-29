import { useChainID } from '@terra-money/apps/hooks';
import { useConnectedWallet } from '@terra-money/wallet-provider';

export const useMyAddress = () => {
  const connectedWallet = useConnectedWallet();
  const chainID = useChainID();

  return connectedWallet?.addresses[chainID];
};
