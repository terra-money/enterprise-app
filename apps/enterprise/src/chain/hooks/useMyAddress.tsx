import { useChainID } from '@terra-money/apps/hooks';
import { useConnectedWallet } from '@terra-money/wallet-provider';

export const useMyAddress = () => {
  const connectedWallet = useConnectedWallet();
  const chainID = useChainID();

  const address = connectedWallet?.addresses[chainID];
  return address ? address : "";
};
