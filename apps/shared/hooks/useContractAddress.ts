import { useWallet } from "@terra-money/wallet-provider";
import { CW20Addr } from "../types";
import { ContractAddresses, getContractAddress } from "../utils";

const NOT_CONNECTED = "not-connected" as CW20Addr;

export const useContractAddress = (
  contract: keyof ContractAddresses
): CW20Addr => {
  const { network } = useWallet();

  return getContractAddress(network.name, contract) ?? NOT_CONNECTED;
};
