import { useConnectedWallet } from "@terra-money/wallet-provider";

export const useMyAddress = () => {
  const connectedWallet = useConnectedWallet();

  return connectedWallet?.addresses?.[0]
}