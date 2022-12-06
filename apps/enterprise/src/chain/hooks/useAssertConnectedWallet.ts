import { useConnectedWallet } from '@terra-money/wallet-provider';

export const useAssertConnectedWallet = () => {
  const connectedWallet = useConnectedWallet();

  if (!connectedWallet) {
    throw new Error('No connected wallet');
  }

  return connectedWallet;
};
