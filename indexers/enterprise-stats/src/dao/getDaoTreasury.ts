import { getLCDClient } from "chain/lcd"
import { enterprise } from "types/contracts";

export const getDaoAssetTreasury = async (address: string) => {
  const lcd = getLCDClient()
  const { assets } = await lcd.wasm.contractQuery<enterprise.AssetTreasuryResponse>(address, { cw20_treasury: {}, });

  return assets.filter(asset => asset.amount !== '0')
}