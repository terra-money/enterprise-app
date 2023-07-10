import { useTx, TxBuilder } from 'chain/transactions';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useChainID } from 'chain/hooks/useChainID';

interface ExecuteProposalTxOptions {
  daoAddress: string;
  proposalId: number;
}

export const getExecuteProposalMsg = ({ id }: Pick<Proposal, 'id'>) => ({
  execute_proposal: {
    proposal_id: id,
  },
});

export const useExecuteProposalTx = () => {
  const myAddress = useMyAddress();
  const chainID = useChainID();

  return useTx<ExecuteProposalTxOptions>(
    (options) => {
      const { daoAddress, proposalId } = options;

      const payload = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(assertDefined(myAddress), daoAddress, getExecuteProposalMsg({ id: proposalId }))
        .build();

      return {
        ...payload,
        chainID,
      };
    },
    {
      txKey: TX_KEY.EXECUTE_PROPOSAL,
    }
  );
};
