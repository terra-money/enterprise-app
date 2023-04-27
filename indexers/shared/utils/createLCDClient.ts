import { LCDClient } from "@terra-money/feather.js";
import { assertEnvVar } from "./assertEnvVar";

// default network config: https://github.com/terra-money/feather.js/blob/main/src/client/lcd/LCDClient.ts#L54
export const createLCDClient = (): LCDClient => {
  const chainID = assertEnvVar('CHAIN_ID')

  return new LCDClient({
    [chainID]: {
      chainID,
      lcd: assertEnvVar('LCD_ENDPOINT'),
      gasAdjustment: 1.75,
      gasPrices: { uluna: 0.015 },
      prefix: 'terra'
    }
  });
};
