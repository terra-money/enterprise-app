import memoize from 'memoizee'
import axios from 'axios'

const TFM_ASSETS_INFO_URL = 'https://api-terra2.tfm.com/tokens'

interface TFMAssetsInfo {
  contract_addr: string,
  decimals: number,
  name: string,
  symbol: string,
}

export const getAssetsInfo = memoize(async () => {
  const { data } = await axios.get<TFMAssetsInfo[]>(TFM_ASSETS_INFO_URL)

  return data
})