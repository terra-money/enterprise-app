import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { ProposalVotingType } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
// import { useTxOverrides } from './useFeeOverrides';

interface ExecuteProposalTxOptions {
  daoAddress: string;
  proposalId: number;
  votingType: ProposalVotingType;
}

export const useExecuteProposalTx = () => {
  // const txOverrides = useTxOverrides();

  return useTx<ExecuteProposalTxOptions>(
    (options) => {
      const { daoAddress, proposalId, wallet, votingType } = options;
      const msg = {
        proposal_id: proposalId,
      };
      const tx = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(
          wallet.walletAddress,
          daoAddress,
          votingType === 'regular'
            ? {
                execute_proposal: msg,
              }
            : {
                execute_council_proposal: msg,
              }
        )
        .build();

      return {
        //...txOverrides,
        ...tx,
      };
    },
    {
      txKey: TX_KEY.EXECUTE_PROPOSAL,
    }
  );
};
