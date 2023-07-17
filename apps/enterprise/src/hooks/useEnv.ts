import { useNetworkName } from 'chain/hooks/useNetworkName';
import { secondsInDay, secondsInMinute } from 'date-fns';

export const useEnv = () => {
  const networkName = useNetworkName();

  return {
    timeConversionFactor: networkName === 'testnet' ? secondsInMinute : secondsInDay,
  };
};
