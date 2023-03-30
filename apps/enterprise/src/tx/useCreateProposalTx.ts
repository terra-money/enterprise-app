import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import Big from 'big.js';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

export type CreateProposalMsgType = Extract<enterprise.ExecuteMsg, { create_proposal: {} }>;

export const useCreateProposalTx = (dao: DAO, proposalVotingType: enterprise.ProposalType) => {
  const {
    type,
    address: daoAddress,
    membershipContractAddress: tokenAddress,
    governanceConfig: { minimumDeposit },
  } = dao;

  return useTx<CreateProposalMsgType>(
    (options) => {
      const { create_proposal, wallet } = options;

      if (type === 'token' && Big(minimumDeposit ?? 0).gt(0)) {
        return TxBuilder.new()
          .hook<enterprise.Cw20HookMsg>(wallet.walletAddress, daoAddress, tokenAddress, minimumDeposit!.toString(), {
            create_proposal,
          })
          .build();
      }

      return TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(
          wallet.walletAddress,
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
    },
    {
      txKey: TX_KEY.CREATE_PROPOSAL,
    }
  );
};
