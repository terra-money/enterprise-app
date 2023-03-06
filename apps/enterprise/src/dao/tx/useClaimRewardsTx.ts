import { TxBuilder, useTx } from "@terra-money/apps/libs/transactions";
import { useAssertMyAddress } from "chain/hooks/useAssertMyAddress";
import { TX_KEY } from "tx";
import { enterprise } from 'types/contracts';

export interface ClaimRewardsParams {
  daoAddress: string;
  cw20Assets: string[];
  nativeDenoms: string[];
}

export const useClaimRewardsTx = () => {
  const walletAddress = useAssertMyAddress();

  return useTx<ClaimRewardsParams>(
    ({ daoAddress, cw20Assets, nativeDenoms }) => {
      let builder = TxBuilder.new();

      builder = builder.execute<enterprise.ExecuteMsg>(walletAddress, daoAddress, {
        claim_rewards: {
          cw20_assets: cw20Assets,
          native_denoms: nativeDenoms,
          member: walletAddress,
        }
      })

      return builder.build()
    },
    {
      txKey: TX_KEY.CLAIM_REWARDS,
    }
  );
}