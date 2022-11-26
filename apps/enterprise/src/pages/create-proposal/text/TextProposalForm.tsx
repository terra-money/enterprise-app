import { proposalTitle } from '../Page';
import { ProposalForm } from '../shared/ProposalForm';

export const TextProposalForm = () => {
  return <ProposalForm title={proposalTitle.text} getProposalActions={() => []} />;
};
