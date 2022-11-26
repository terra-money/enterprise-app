import { NetworkInfo } from "@terra-money/wallet-provider";
import { LCDClient } from "@terra-money/terra.js/dist/client";
import { u } from "../../types";
import Big from "big.js";

export const fetchNativeBalance = async (
  networkOrLCD: NetworkInfo | LCDClient,
  walletAddr: string,
  denom: string
): Promise<u<Big>> => {
  const lcd =
    networkOrLCD instanceof LCDClient
      ? networkOrLCD
      : new LCDClient({
          URL: networkOrLCD.lcd,
          chainID: networkOrLCD.chainID,
        });

  const [coins] = await lcd.bank.balance(walletAddr);

  const coin = coins.get(denom);

  return Big(coin === undefined ? 0 : coin.amount.toNumber()) as u<Big>;
};
