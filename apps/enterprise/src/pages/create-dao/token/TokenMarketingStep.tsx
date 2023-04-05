import { Stack } from '@mui/material';
import { TokenMarketing, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';
import { WizardStep } from '../WizardStep';

export const TokenMarketingStep = () => {
  const { formState, formInput } = useDaoWizardForm();
  const {
    tokenMarketing: {
      description,
      descriptionError,
      logo,
      logoError,
      marketingOwner,
      marketingOwnerError,
      project,
      projectError,
    },
  } = formState;

  const onChange = (params: Partial<TokenMarketing>) => {
    formInput({ tokenMarketing: { ...formState.tokenMarketing, ...params } });
  };

  return (
    <WizardStep title="Create your token">
      <Stack direction="column" spacing={4}>
        <WizardInput
          label="Description"
          placeholder="Enter token description"
          value={description}
          error={description !== undefined && description?.length > 0 ? descriptionError : undefined}
          onChange={({ currentTarget }) => onChange({ description: currentTarget.value })}
        />
        <WizardInput
          label="Logo URL"
          placeholder="Enter logo url"
          value={logo}
          error={logo !== undefined && logo?.length > 0 ? logoError : undefined}
          onChange={({ currentTarget }) => onChange({ logo: currentTarget.value })}
        />
        <WizardInput
          label="Marketing Owner Address"
          placeholder="Enter wallet address"
          value={marketingOwner}
          error={marketingOwner !== undefined && marketingOwner?.length > 0 ? marketingOwnerError : undefined}
          onChange={({ currentTarget }) => onChange({ marketingOwner: currentTarget.value })}
          helpText='The address who can update description and project name'
        />
        <WizardInput
          label="Project"
          placeholder="Type project name"
          value={project}
          error={project !== undefined && project?.length > 0 ? projectError : undefined}
          onChange={({ currentTarget }) => onChange({ project: currentTarget.value })}
        />
      </Stack>
    </WizardStep>
  );
};
