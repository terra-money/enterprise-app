import { CW20Addr } from "../types";
import { ContractAddresses, getContractAddress } from "../utils";
import { useNetworkName } from "./useNetworkName";

const NOT_CONNECTED = "not-connected" as CW20Addr;

export const useContractAddress = (
  contract: keyof ContractAddresses
): CW20Addr => {
  const networkName = useNetworkName()

  return getContractAddress(networkName, contract) ?? NOT_CONNECTED;
};
