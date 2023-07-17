import { useChainID } from 'chain/hooks/useChainID';
import { TxBuilder, useTx } from 'chain/transactions';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { funds_distributor } from 'types/contracts';

export interface ClaimRewardsParams {
  fundsDistributorAddress: string;
  cw20Assets: string[];
  nativeDenoms: string[];
}

export const useClaimRewardsTx = () => {
  const walletAddress = useAssertMyAddress();

  const chainID = useChainID();

  return useTx<ClaimRewardsParams>(
    ({ fundsDistributorAddress, cw20Assets, nativeDenoms }) => {
      let builder = TxBuilder.new();

      builder = builder.execute<funds_distributor.ExecuteMsg>(walletAddress, fundsDistributorAddress, {
        claim_rewards: {
          cw20_assets: cw20Assets,
          native_denoms: nativeDenoms,
          user: walletAddress,
        },
      });

      return {
        ...builder.build(),
        chainID,
      };
    },
    {
      txKey: TX_KEY.CLAIM_REWARDS,
    }
  );
};
