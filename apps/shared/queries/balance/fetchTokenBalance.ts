import { NetworkInfo } from "@terra-money/wallet-provider";
import Big from "big.js";
import { u, Token } from "../../types";
import { fetchCW20Balance } from "./fetchCW20Balance";
import { fetchNativeBalance } from "./fetchNativeBalance";

export const fetchTokenBalance = async (
  network: NetworkInfo,
  token: Token | undefined,
  walletAddr: string
): Promise<u<Big>> => {
  if (token === undefined) {
    return Big(0) as u<Big>;
  }

  switch (token.type) {
    case "native":
      return fetchNativeBalance(network, walletAddr, token.denom);
    case "ibc":
      return fetchNativeBalance(network, walletAddr, token.denom);
    case "cw20":
      return fetchCW20Balance(network, walletAddr, token.token);
  }
};
