import { Asset } from "./Asset"
import { getLCDClient } from "./lcd"
import memoize from 'memoizee'

interface GetAssetBalance {
  asset: Asset
  address: string
}

interface CW20BalanceResponse {
  balance?: string
}

export const getAssetBalance = memoize(async ({ asset, address }: GetAssetBalance) => {
  const { id, type } = asset

  const lcd = getLCDClient()

  if (type === 'native') {
    const [coins] = await lcd.bank.balance(address);

    const coin = coins.get(id);

    return coin?.amount.toString() ?? '0'
  }

  const { balance } = await lcd.wasm.contractQuery<CW20BalanceResponse>(
    id,
    {
      balance: {
        address,
      },
    }
  );

  return balance ?? '0'
})