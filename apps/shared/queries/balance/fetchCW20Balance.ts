import { NetworkInfo } from "@terra-money/wallet-provider";
import { LCDClient } from "@terra-money/terra.js/dist/client";
import { Big } from "big.js";
import { u } from "../../types";

interface CW20BalanceResponse {
  balance: u<Big>;
}

export const fetchCW20Balance = async (
  networkOrLCD: NetworkInfo | LCDClient,
  walletAddr: string,
  tokenAddr: string
): Promise<u<Big>> => {
  const lcd =
    networkOrLCD instanceof LCDClient
      ? networkOrLCD
      : new LCDClient({
          URL: networkOrLCD.lcd,
          chainID: networkOrLCD.chainID,
        });

  const response = await lcd.wasm.contractQuery<CW20BalanceResponse>(
    tokenAddr,
    {
      balance: {
        address: walletAddr,
      },
    }
  );

  return Big(response?.balance ?? 0) as u<Big>;
};
