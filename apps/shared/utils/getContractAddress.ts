import { CW20Addr } from "../types";
import contracts from "../../../refs.json";

type NetworkName = "mainnet" | "testnet" | "localterra";

interface ContractDefinition {
  codeId: string;
  address: string;
}

export interface ContractAddresses {
  "fountain-streams": ContractDefinition;
  "story-manager": ContractDefinition;
  "story-root-dao": ContractDefinition;
  "story-protocol-token": ContractDefinition;
  "prediction-markets": ContractDefinition;
  "enterprise-factory": ContractDefinition;
  enterprise: ContractDefinition;
  "proxy-wallet-core": ContractDefinition;
  "improv-hub": ContractDefinition;
  "warp-keeper": ContractDefinition;
  "warp-controller": ContractDefinition;
  "warp-account": ContractDefinition;
  "warp-token": ContractDefinition;
}

export const CONTRACT_ADDRESSES = contracts as unknown as Record<
  Partial<NetworkName>,
  Partial<ContractAddresses>
>;

export const getContractAddress = (
  network: string,
  contract: keyof ContractAddresses
): CW20Addr | undefined => {
  const networkName = network as NetworkName;

  if (CONTRACT_ADDRESSES[networkName]) {
    const definition = CONTRACT_ADDRESSES[networkName][contract];
    if (definition !== undefined) {
      return definition.address as CW20Addr;
    }
  }
  return undefined;
};
