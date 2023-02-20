import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { ProposalVotingType } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

interface VoteOnProposalTxOptions {
  id: number;
  outcome: enterprise.VoteOutcome;
  contract: string;
}

interface MultisigExecuteMsg {
  cast_vote: {
    proposal_id: number;
    vote: enterprise.VoteOutcome;
  };
}

export const useCastVoteTx = (proposalVotingType: ProposalVotingType) => {
  return useTx<VoteOnProposalTxOptions>(
    (options) => {
      const { id, outcome, contract, wallet } = options;

      const cast_vote = {
        proposal_id: id,
        outcome,
      };

      return TxBuilder.new()
        .execute<MultisigExecuteMsg | enterprise.ExecuteMsg>(
          wallet.walletAddress,
          contract,
          { cast_vote }
        )
        .build();
    },
    {
      txKey: TX_KEY.CAST_VOTE,
    }
  );
};
