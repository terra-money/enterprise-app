import { Dao } from "./Dao"
import { getDaoTotalStakedAmount } from "./getDaoTotalStakedAmount"
import { getNFTCollectionFloorPrice } from "chain/getNftCollectionFloorPrice"

export const getNFTDaoStakedValue = async (dao: Pick<Dao, 'address' | 'membershipContractAddress'>) => {
  const amount = await getDaoTotalStakedAmount(dao)
  const price = await getNFTCollectionFloorPrice(dao.address)

  return Number(amount) * price
}