import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { Proposal, ProposalVotingType } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
// import { useTxOverrides } from './useFeeOverrides';

interface ExecuteProposalTxOptions {
  daoAddress: string;
  proposalId: number;
  votingType: ProposalVotingType;
}

export const getExecuteProposalMsg = ({ id, votingType }: Pick<Proposal, 'id' | 'votingType'>) => {
  const msg = {
    proposal_id: id,
  };

  return votingType === 'general'
    ? {
        execute_proposal: msg,
      }
    : {
        execute_council_proposal: msg,
      };
};

export const useExecuteProposalTx = () => {
  // const txOverrides = useTxOverrides();

  return useTx<ExecuteProposalTxOptions>(
    (options) => {
      const { daoAddress, proposalId, wallet, votingType } = options;
      const tx = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(
          wallet.walletAddress,
          daoAddress,
          getExecuteProposalMsg({ id: proposalId, votingType })
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
