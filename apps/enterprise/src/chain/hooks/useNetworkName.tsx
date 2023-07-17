import { useChainID } from './useChainID';

export type NetworkName = 'mainnet' | 'testnet';

export const useNetworkName = (): NetworkName => {
  const chainID = useChainID();

  if (chainID === 'phoenix-1') {
    return 'mainnet';
  }

  return 'testnet';
};
