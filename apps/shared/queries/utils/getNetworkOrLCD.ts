import { LCDClient } from "@terra-money/terra.js";
import { NetworkInfo } from "@terra-money/wallet-provider";

export const getNetworkOrLCD = (
  networkOrLCD: NetworkInfo | LCDClient
): LCDClient => {
  return networkOrLCD instanceof LCDClient
    ? networkOrLCD
    : new LCDClient({
        URL: networkOrLCD.lcd,
        chainID: networkOrLCD.chainID,
      });
};
