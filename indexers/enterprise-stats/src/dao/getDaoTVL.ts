import { Dao } from "./Dao"
import { getDaoAssets } from "./getDaoAssets"

export const getDaoTVL = async (dao: Pick<Dao, 'address' | 'enterpriseFactoryContract'>) => {
  const assets = await getDaoAssets(dao)
  console.log('assets: ', assets)

  return 0
}