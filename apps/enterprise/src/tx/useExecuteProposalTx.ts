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

export const getExecuteProposalMsg = ({ id }: Pick<Proposal, 'id'>) => {
  const msg = {
    proposal_id: id,
  };
  return { execute_proposal: msg }
  // TODO: Add back when audit is done
  // return votingType === 'regular'
  //   ? {
  //       execute_proposal: msg,
  //     }
  //   : {
  //       execute_council_proposal: msg,
  //     };
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
          getExecuteProposalMsg({ id: proposalId })
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
