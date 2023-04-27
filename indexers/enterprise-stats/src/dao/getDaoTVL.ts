import { getDaoAssets } from "./getDaoAssets"

export const getDaoTVL = async (address: string) => {
  const assets = await getDaoAssets(address)
  console.log('assets: ', assets)

  return 0
}