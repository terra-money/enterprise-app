import { LCDClient } from "@terra-money/feather.js";
import { assertEnvVar } from "shared/assertEnvVar";

// default network config: https://github.com/terra-money/feather.js/blob/main/src/client/lcd/LCDClient.ts#L54
let client: LCDClient | undefined;
export const getLCDClient = (): LCDClient => {
  if (!client) {
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
  }

  return client
};
