import { assertDefined } from 'lib/shared/utils/assertDefined';
import { AssetType } from 'chain';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useContract } from 'chain/hooks/useContract';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { funds_distributor } from 'types/contracts';

interface UseMyDaoRewardsQueryParams {
  fundsDistributorAddress: string;
  cw20Assets: string[];
  nativeDenoms: string[];
}

type RewardsQueryArguments = Extract<funds_distributor.QueryMsg, { user_rewards: {} }>;

interface CW20Reward {
  asset: string;
  amount: string;
}

interface NativeReward {
  denom: string;
  amount: string;
}

interface RewardsResponse {
  cw20_rewards: CW20Reward[];
  native_rewards: NativeReward[];
}

export interface DaoReward {
  id: string;
  amount: string;
  type: AssetType;
}

export const useMyDaoRewardsQuery = (params?: UseMyDaoRewardsQueryParams) => {
  const { query } = useContract();
  const walletAddress = useAssertMyAddress();

  return useQuery(
    [QUERY_KEY.MY_DAO_REWARDS, params],
    async () => {
      const { fundsDistributorAddress, nativeDenoms, cw20Assets } = assertDefined(params);
      const { cw20_rewards, native_rewards } = await query<RewardsQueryArguments, RewardsResponse>(
        fundsDistributorAddress,
        {
          user_rewards: {
            native_denoms: nativeDenoms,
            cw20_assets: cw20Assets,
            user: walletAddress,
          },
        }
      );

      const rewards: DaoReward[] = [
        ...cw20_rewards.map(({ asset, amount }): DaoReward => ({ id: asset, amount, type: 'cw20' })),
        ...native_rewards.map(({ denom, amount }): DaoReward => ({ id: denom, amount, type: 'native' })),
      ].filter((reward) => reward.amount !== '0');

      return rewards;
    },
    {
      enabled: !!params,
    }
  );
};
