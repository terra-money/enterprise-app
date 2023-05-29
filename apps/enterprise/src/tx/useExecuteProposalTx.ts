import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from '@terra-money/apps/utils';
import { useChainID } from '@terra-money/apps/hooks';

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
