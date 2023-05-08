import { NetworkInfo } from '@terra-money/wallet-provider';
import { LCDClient } from '@terra-money/feather.js';
import Big from 'big.js';
import { contractQuery } from '@terra-money/apps/queries';
import { enterprise } from 'types/contracts';
import { CW20Addr, u } from '@terra-money/apps/types';

export const fetchStakingAmount = async (
  networkOrLCD: NetworkInfo | LCDClient,
  daoAddress: CW20Addr,
  walletAddress?: CW20Addr
): Promise<u<Big>> => {
  if (walletAddress === undefined) {
    const response = await contractQuery<enterprise.QueryMsg, { total_staked_amount: string }>(
      networkOrLCD,
      daoAddress,
      { total_staked_amount: {} }
    );
    return Big(response.total_staked_amount) as u<Big>;
  }

  const response = await contractQuery<enterprise.QueryMsg, enterprise.UserStakeResponse>(networkOrLCD, daoAddress, {
    user_stake: { user: walletAddress },
  });

  const amount =
    typeof response.user_stake === 'object'
      ? 'token' in response.user_stake
        ? Big(response.user_stake.token.amount)
        : Big(response.user_stake.nft.amount)
      : Big(0);

  return amount as u<Big>;
};
