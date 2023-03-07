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
interface RewardsResponse { }

export const useMyDaoRewardsQuery = (params?: UseMyDaoRewardsQueryParams) => {
  const { query } = useContract();
  const walletAddress = useAssertMyAddress();

  return useQuery([QUERY_KEY.MY_DAO_REWARDS, params], async () => {
    const { fundsDistributorAddress, nativeDenoms, cw20Assets } = assertDefined(params)
    const result = await query<RewardsQueryArguments, RewardsResponse>(fundsDistributorAddress, {
      user_rewards: {
        native_denoms: nativeDenoms,
        cw20_assets: cw20Assets,
        user: walletAddress
      }
    })

    return result
  }, {
    enabled: !!params,
  });
}