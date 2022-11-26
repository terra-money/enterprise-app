import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

interface UnstakeNFTTxOptions {
  daoAddress: string;
  tokens: string[];
}

export const useUnstakeNFTTx = () => {
  return useTx<UnstakeNFTTxOptions>(
    (options) => {
      const { daoAddress, tokens, wallet } = options;

      return TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(wallet.walletAddress, daoAddress, {
          unstake: { cw721: { tokens } },
        })
        .build();
    },
    {
      txKey: TX_KEY.UNSTAKE_NFT,
    }
  );
};
