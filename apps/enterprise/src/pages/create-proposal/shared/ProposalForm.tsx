import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useNavigate } from 'react-router';
import { useCreateProposalTx } from 'tx';
import { enterprise } from 'types/contracts';
import { useCreateProposal } from '../CreateProposalProvider';
import { DescriptionInput } from './DescriptionInput';
import { toCreateProposalMsg } from './helpers/toCreateProposalMsg';
import { ProposalFormContainer } from './ProposalFormContainer';
import { TitleInput } from './TitleInput';
import { ProposalFormState, useProposalForm } from './useProposalForm';
import { toDao } from 'dao/utils/toDao';

interface ProposalFormProps {
  children?: React.ReactNode;
  disabled?: boolean;
  initialState?: Partial<ProposalFormState>;
  getProposalActions: () => enterprise.CreateProposalMsg['proposal_actions'];
}

export const ProposalForm = ({ children, disabled, getProposalActions, initialState = {} }: ProposalFormProps) => {
  const [input, formState] = useProposalForm(initialState);
  const { title, titleError, description, descriptionError, submitDisabled } = formState;

  const dao = useCurrentDao();
  const { proposalVotingType } = useCreateProposal();
  const [txResult, tx] = useCreateProposalTx(toDao(dao), proposalVotingType);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (submitDisabled) {
      return;
    }

    await tx(toCreateProposalMsg(formState, getProposalActions()));
    navigate(`/dao/${dao.address}/proposals`);
  };

  return (
    <ProposalFormContainer disabled={disabled || submitDisabled} loading={txResult.loading} onSubmit={handleSubmit}>
      <TitleInput
        label="Title"
        value={title}
        error={title.length > 0 ? titleError : undefined}
        onChange={(title) => input({ title })}
      />
      <DescriptionInput
        label="Description"
        value={description}
        error={description.length > 0 ? descriptionError : undefined}
        onChange={(description) => input({ description })}
      />
      {children}
    </ProposalFormContainer>
  );
};
