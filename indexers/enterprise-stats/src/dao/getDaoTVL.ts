import { getDaoAssetTreasury } from "./getDaoTreasury"

export const getDaoTVL = async (address: string) => {
  const assets = await getDaoAssetTreasury(address)
  console.log('assets: ', assets)

  return 0
}