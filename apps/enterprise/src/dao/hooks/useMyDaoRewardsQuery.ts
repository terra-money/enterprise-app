import { assertDefined } from "@terra-money/apps/utils";
import { useAssertMyAddress } from "chain/hooks/useAssertMyAddress";
import { useContract } from "chain/hooks/useContract";
import { QUERY_KEY } from "queries";
import { useQuery } from "react-query";
import { funds_distributor } from "types/contracts";

interface UseMyDaoRewardsQueryParams {
  fundsDistributorAddress: string;
  cw20Assets: string[];
  nativeDenoms: string[];
}

type RewardsQueryArguments = Extract<funds_distributor.QueryMsg, { user_rewards: {} }>;

interface CW20Reward {
  asset: string;
  amount: string
}

interface NativeReward {
  denom: string;
  amount: string
}

interface RewardsResponse {
  cw20_rewards: CW20Reward[],
  native_rewards: NativeReward[]
}

export const useMyDaoRewardsQuery = (params?: UseMyDaoRewardsQueryParams) => {
  const { query } = useContract();
  const walletAddress = useAssertMyAddress();

  return useQuery([QUERY_KEY.MY_DAO_REWARDS, params], async () => {
    const { fundsDistributorAddress, nativeDenoms, cw20Assets } = assertDefined(params)
    const { cw20_rewards, native_rewards } = await query<RewardsQueryArguments, RewardsResponse>(fundsDistributorAddress, {
      user_rewards: {
        native_denoms: nativeDenoms,
        cw20_assets: cw20Assets,
        user: walletAddress
      }
    })

    return {
      cw20Rewards: cw20_rewards.filter(reward => reward.amount !== "0"),
      nativeRewards: native_rewards.filter(reward => reward.amount !== "0")
    }
  }, {
    enabled: !!params,
  });
}