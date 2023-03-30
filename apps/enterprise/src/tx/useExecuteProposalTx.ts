import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
// import { useTxOverrides } from './useFeeOverrides';

interface ExecuteProposalTxOptions {
  daoAddress: string;
  proposalId: number;
}

export const getExecuteProposalMsg = ({ id }: Pick<Proposal, 'id'>) => ({
  execute_proposal: {
    proposal_id: id,
  },
})

export const useExecuteProposalTx = () => {
  return useTx<ExecuteProposalTxOptions>(
    (options) => {
      const { daoAddress, proposalId, wallet } = options;
      const tx = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(
          wallet.walletAddress,
          daoAddress,
          getExecuteProposalMsg({ id: proposalId })
        )
        .build();

      return tx
    },
    {
      txKey: TX_KEY.EXECUTE_PROPOSAL,
    }
  );
};
