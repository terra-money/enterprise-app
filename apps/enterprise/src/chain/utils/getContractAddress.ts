import contracts from 'chain/refs.json';

type NetworkName = 'mainnet' | 'testnet' | 'localterra';

interface ContractDefinition {
  codeId: string;
  address: string;
}

export interface ContractAddresses {
  'enterprise-factory': ContractDefinition;
  enterprise: ContractDefinition;
}

export const CONTRACT_ADDRESSES = contracts as unknown as Record<Partial<NetworkName>, Partial<ContractAddresses>>;

export const getContractAddress = (network: string, contract: keyof ContractAddresses): string | undefined => {
  const networkName = network as NetworkName;

  if (CONTRACT_ADDRESSES[networkName]) {
    const definition = CONTRACT_ADDRESSES[networkName][contract];
    if (definition !== undefined) {
      return definition.address;
    }
  }
  return undefined;
};
