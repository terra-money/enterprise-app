import { Asset } from "./Asset"
import { contractQuery, getBankBalance } from "./lcd"
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

  if (type === 'native') {
    const coins = await getBankBalance(address)
    if (!coins) return '0'

    const coin = coins.get(asset.id);

    return coin?.amount?.toString() ?? '0'
  }

  const { balance } = await contractQuery<CW20BalanceResponse>(
    id,
    {
      balance: {
        address,
      },
    }
  );

  return balance ?? '0'
})