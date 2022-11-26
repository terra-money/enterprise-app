import { useWallet } from '@terra-money/wallet-provider';
import { secondsInDay, secondsInMinute } from 'date-fns';

export const useEnv = () => {
  const { network } = useWallet();

  return {
    timeConversionFactor: network.name === 'testnet' || network.name === 'localterra' ? secondsInMinute : secondsInDay,
  };
};
