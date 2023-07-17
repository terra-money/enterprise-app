import { ContractAddresses, getContractAddress } from 'chain/utils/getContractAddress';
import { useNetworkName } from './useNetworkName';

const NOT_CONNECTED = 'not-connected';

export const useContractAddress = (contract: keyof ContractAddresses): string => {
  const networkName = useNetworkName();

  return getContractAddress(networkName, contract) ?? NOT_CONNECTED;
};
