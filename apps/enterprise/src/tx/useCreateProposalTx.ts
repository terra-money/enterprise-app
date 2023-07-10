import { useTx, TxBuilder } from 'chain/transactions';
import Big from 'big.js';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useChainID } from 'chain/hooks/useChainID';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export type CreateProposalMsgType = Extract<enterprise.ExecuteMsg, { create_proposal: {} }>;

export const useCreateProposalTx = (dao: DAO, proposalVotingType: enterprise.ProposalType) => {
  const {
    type,
    address: daoAddress,
    membershipContractAddress: tokenAddress,
    governanceConfig: { minimumDeposit },
  } = dao;

  const chainID = useChainID();
  const myAddress = useMyAddress();

  return useTx<CreateProposalMsgType>(
    (options) => {
      const { create_proposal } = options;

      if (type === 'token' && Big(minimumDeposit ?? 0).gt(0)) {
        const payload = TxBuilder.new()
          .hook<enterprise.Cw20HookMsg>(
            assertDefined(myAddress),
            daoAddress,
            tokenAddress,
            minimumDeposit!.toString(),
            {
              create_proposal,
            }
          )
          .build();

        return {
          ...payload,
          chainID,
        };
      }

      const payload = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(
          assertDefined(myAddress),
          daoAddress,
          proposalVotingType === 'general'
            ? {
                create_proposal,
              }
            : {
                create_council_proposal: create_proposal,
              }
        )
        .build();

      return {
        ...payload,
        chainID,
      };
    },
    {
      txKey: TX_KEY.CREATE_PROPOSAL,
    }
  );
};
