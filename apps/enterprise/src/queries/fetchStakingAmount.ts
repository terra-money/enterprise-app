import { LCDClient } from '@terra-money/feather.js';
import Big from 'big.js';
import { enterprise } from 'types/contracts';

export const fetchStakingAmount = async (lcd: LCDClient, daoAddress: string, walletAddress?: string): Promise<Big> => {
  if (walletAddress === undefined) {
    const response = await lcd.wasm.contractQuery<{ total_staked_amount: string }>(daoAddress, {
      total_staked_amount: {},
    });
    return Big(response.total_staked_amount) as Big;
  }

  const response = await lcd.wasm.contractQuery<enterprise.UserStakeResponse>(daoAddress, {
    user_stake: { user: walletAddress },
  });

  const amount =
    typeof response.user_stake === 'object'
      ? 'token' in response.user_stake
        ? Big(response.user_stake.token.amount)
        : Big(response.user_stake.nft.amount)
      : Big(0);

  return amount as Big;
};
