import axios from 'axios'
import memoize from 'memoizee'

const TFM_ASSETS_PRICES_URL = 'https://price.api.tfm.com/tokens/?limit=1500'

type TFMChain = 'osmosis' | 'terra2' | 'juno' | 'terra_classic'

interface TFMTokenInfo {
  chain: TFMChain
  usd: number
}

type TFMResponse = Record<string, TFMTokenInfo>

export const getAssetsPrices = memoize(async () => {
  const { data } = await axios.get<TFMResponse>(TFM_ASSETS_PRICES_URL)

  return data
})