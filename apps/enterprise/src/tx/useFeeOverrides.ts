import { useNetworkName } from 'chain/hooks/useNetworkName';
import { CreateTxOptions, Fee } from '@terra-money/feather.js';

export const useTxOverrides = (): Partial<CreateTxOptions> => {
  const networkName = useNetworkName();

  if (networkName === 'testnet') {
    return {
      fee: new Fee(1671053, '1671053uluna'),
      gasAdjustment: 1.6,
    };
  }

  return {};
};
