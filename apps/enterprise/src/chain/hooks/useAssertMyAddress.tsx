import { useAssertConnectedWallet } from './useAssertConnectedWallet';

export const useAssertMyAddress = () => {
  const { terraAddress } = useAssertConnectedWallet();

  return terraAddress;
};
