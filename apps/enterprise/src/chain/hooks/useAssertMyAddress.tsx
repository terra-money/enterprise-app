import { useAssertConnectedWallet } from './useAssertConnectedWallet';

export const useAssertMyAddress = () => {
  const { addresses } = useAssertConnectedWallet();

  return Object.values(addresses)[0];
};
