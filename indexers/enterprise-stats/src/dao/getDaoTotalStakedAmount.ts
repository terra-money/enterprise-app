import { contractQuery } from "chain/lcd";
import { enterprise } from "types/contracts";
import { Dao } from "./Dao";

export const getDaoTotalStakedAmount = async (dao: Pick<Dao, 'address'>) => {
  const { total_staked_amount } = await contractQuery<enterprise.TotalStakedAmountResponse>(
    dao.address,
    { total_staked_amount: {} }
  );

  return total_staked_amount
}