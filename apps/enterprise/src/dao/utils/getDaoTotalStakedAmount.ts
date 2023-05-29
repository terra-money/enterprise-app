import { LCDClient } from '@terra-money/feather.js';
import { enterprise } from 'types/contracts';

interface GetDaoTotalStakedAmountParams {
  lcd: LCDClient;
  address: string;
}

export const getDaoTotalStakedAmount = async ({ lcd, address }: GetDaoTotalStakedAmountParams) => {
  const { total_staked_amount } = await lcd.wasm.contractQuery<enterprise.TotalStakedAmountResponse>(address, {
    total_staked_amount: {},
  });

  return total_staked_amount;
};
