import Big from "big.js";
import { u, Token } from "../../types";
import { fetchCW20Balance } from "./fetchCW20Balance";
import { fetchNativeBalance } from "./fetchNativeBalance";
import { LCDClient } from "@terra-money/feather.js";

export const fetchTokenBalance = async (
  lcd: LCDClient,
  token: Token | undefined,
  walletAddr: string
): Promise<u<Big>> => {
  if (token === undefined) {
    return Big(0) as u<Big>;
  }

  switch (token.type) {
    case "native":
      return fetchNativeBalance(lcd, walletAddr, token.denom);
    case "ibc":
      return fetchNativeBalance(lcd, walletAddr, token.denom);
    case "cw20":
      return fetchCW20Balance(lcd, walletAddr, token.token);
  }
};
