import { LCDClient } from "@terra-money/terra.js";

export const getLCDClient = () => {
  return new LCDClient({
    URL: process.env.LCD_ENDPOINT,
    chainID: process.env.CHAIN_ID,
  });
};
