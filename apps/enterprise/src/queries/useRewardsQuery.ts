import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { NetworkInfo } from '@terra-money/wallet-provider';
import { getNetworkOrLCD } from '@terra-money/apps/queries';

interface UserRewardsResponse {
    native_rewards: NativeReward[],
    Cw20Rewards: Cw20Reward[]
}

interface NativeReward {
    denom: string,
    amount: string,
}

interface Cw20Reward {
    asset: string,
    amount: string,
}

export const useRewardsQuery = async (network: NetworkInfo, daoAddress: string, user: string, userWeight: string, nativeDenoms: string[], cw20Assets: string[]): Promise<UserRewardsResponse> => {
  const lcd = getNetworkOrLCD(network);

  const response = await lcd.wasm.contractQuery<UserRewardsResponse>(daoAddress, {
    num_tokens: {user: user, user_weight: userWeight, native_denoms: nativeDenoms, cw20_assets: cw20Assets},
  });

  return response;
};
