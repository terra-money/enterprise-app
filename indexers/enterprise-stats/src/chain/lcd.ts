import { LCDClient } from "@terra-money/feather.js";
import { assertEnvVar } from "shared/assertEnvVar";
import memoize from 'memoizee'
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

async function handleTooManyRequestsError<T>(promise: Promise<T>): Promise<T> {
  if (hadTooManyRequestsErrorAt && Date.now() - hadTooManyRequestsErrorAt < tooManyRequestsErrorCooldown) {
    await sleep(tooManyRequestsErrorCooldown)
  }

  try {
    return await promise
  } catch (err) {
    if (err.response.status === 429) {
      hadTooManyRequestsErrorAt = Date.now()

      return handleTooManyRequestsError(promise)
    } else {
      throw err
    }
  }
}

export async function contractQuery<T>(contractAddress: string, msg: object | string): Promise<T> {
  return handleTooManyRequestsError(getLCDClient().wasm.contractQuery(contractAddress, msg))
}

export const getBankBalance = memoize(async (address: string) => {
  const promise = getLCDClient().bank.spendableBalances(address).then(([coins]) => coins)

  return handleTooManyRequestsError(promise)
})