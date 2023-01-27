import { useWallet } from '@terra-money/wallet-provider';
import { NetworkMoniker } from 'chain/NetworkMoniker';

export const useTerraNetwork = () => {
  const { network } = useWallet();

  return {
    moniker:
      network.name === 'testnet'
        ? NetworkMoniker.Testnet
        : NetworkMoniker.Mainnet,
  };
};
