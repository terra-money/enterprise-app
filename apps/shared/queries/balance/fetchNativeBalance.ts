import { LCDClient } from "@terra-money/feather.js";
import { u } from "../../types";
import Big from "big.js";

export const fetchNativeBalance = async (
  lcd: LCDClient,
  walletAddr: string,
  denom: string
): Promise<u<Big>> => {
  const [coins] = await lcd.bank.balance(walletAddr);

  const coin = coins.get(denom);

  return Big(coin === undefined ? 0 : coin.amount.toNumber()) as u<Big>;
};
