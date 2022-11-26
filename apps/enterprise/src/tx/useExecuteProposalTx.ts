import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useTxOverrides } from './useFeeOverrides';

interface ExecuteProposalTxOptions {
  daoAddress: string;
  proposalId: number;
}

export const useExecuteProposalTx = () => {
  const txOverrides = useTxOverrides();

  return useTx<ExecuteProposalTxOptions>(
    (options) => {
      const { daoAddress, proposalId, wallet } = options;
      const tx = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(wallet.walletAddress, daoAddress, {
          execute_proposal: {
            proposal_id: proposalId,
          },
        })
        .build();

      return {
        ...txOverrides,
        ...tx,
      };
    },
    {
      txKey: TX_KEY.EXECUTE_PROPOSAL,
    }
  );
};
