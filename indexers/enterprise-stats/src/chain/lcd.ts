import { LCDClient } from "@terra-money/feather.js";
import { assertEnvVar } from "shared/assertEnvVar";
import memoize from 'memoizee'
import { isAxiosError } from "axios";
import { sleep } from "shared/sleep";

export const getLCDClient = memoize((): LCDClient => {
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
});

let hadTooManyRequestsErrorAt: undefined | number = undefined
const tooManyRequestsErrorCooldown = 1000 * 60

export async function contractQuery<T>(contractAddress: string, msg: object | string): Promise<T> {
  if (hadTooManyRequestsErrorAt && Date.now() - hadTooManyRequestsErrorAt < tooManyRequestsErrorCooldown) {
    await sleep(tooManyRequestsErrorCooldown)
  }

  try {
    const result = await getLCDClient().wasm.contractQuery(contractAddress, msg)

    return result
  } catch (err) {
    if (err.response.status === 429) {
      hadTooManyRequestsErrorAt = Date.now()

      return contractQuery(contractAddress, msg)
    } else {
      throw err
    }
  }
}