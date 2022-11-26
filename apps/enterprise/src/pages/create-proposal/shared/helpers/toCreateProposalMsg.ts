import { CreateProposalMsgType } from 'tx';
import { enterprise } from 'types/contracts';
import { ProposalFormInput } from '../useProposalForm';

export const toCreateProposalMsg = (
  { title, description }: ProposalFormInput,
  proposalActions: enterprise.CreateProposalMsg['proposal_actions']
): CreateProposalMsgType => ({
  create_proposal: {
    title,
    description,
    proposal_actions: proposalActions,
  },
});
