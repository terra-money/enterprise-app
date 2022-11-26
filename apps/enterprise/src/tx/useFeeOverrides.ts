import { CreateTxOptions, Fee } from '@terra-money/terra.js';
import { useWallet } from '@terra-money/wallet-provider';

export const useTxOverrides = (): Partial<CreateTxOptions> => {
  const { network } = useWallet();

  if (network.name === 'localterra' || network.name === 'testnet') {
    return {
      fee: new Fee(1671053, '1671053uluna'),
      gasAdjustment: 1.6,
    };
  }

  return {};
};
