import axios from 'axios'

const TFM_ASSETS_PRICES_URL = 'https://price.api.tfm.com/tokens/?limit=1500'

type TFMChain = 'osmosis' | 'terra2' | 'juno' | 'terra_classic'

interface TFMTokenInfo {
  chain: TFMChain
  usd: number
}

type TFMResponse = Record<string, TFMTokenInfo>

let prices: TFMResponse | undefined
export const getAssetsPrices = async () => {
  if (!prices) {
    const { data } = await axios.get<TFMResponse>(TFM_ASSETS_PRICES_URL)

    prices = data
  }

  return prices
}