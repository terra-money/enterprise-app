import { proposalTitle } from '../SelectProposalTypePage';
import { ProposalForm } from '../shared/ProposalForm';

export const TextProposalForm = () => {
  return <ProposalForm title={proposalTitle.text} getProposalActions={() => []} />;
};
