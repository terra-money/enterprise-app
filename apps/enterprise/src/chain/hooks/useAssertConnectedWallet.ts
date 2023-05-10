import { useConnectedWallet } from '@terra-money/wallet-provider';

export const useAssertConnectedWallet = () => {
  const connectedWallet = useConnectedWallet();

  if (!connectedWallet) {
    throw new Error('Connect your wallet');
  }

  return connectedWallet;
};
