import { Stack } from '@mui/material';
import { TokenInfo, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';
import { WizardStep } from '../WizardStep';

export const TokenInfoStep = () => {
  const { formState, formInput } = useDaoWizardForm();
  const {
    tokenInfo: { decimals, decimalsError, name, nameError, symbol, symbolError, description, descriptionError, logo, logoError, marketingOwner, marketingOwnerError, project, projectError },
  } = formState;

  const onChange = (params: Partial<TokenInfo>) => {
    formInput({ tokenInfo: { ...formState.tokenInfo, ...params } });
  };

  return (
    <WizardStep title="Create your token">
      <Stack direction="column" spacing={4}>
        <WizardInput
          label="Token Name"
          placeholder="Type name of your token"
          value={name}
          error={name.length > 0 ? nameError : undefined}
          onChange={({ currentTarget }) => onChange({ name: currentTarget.value })}
        />
        <WizardInput
          label="Token Symbol"
          placeholder="Type symbol of your token"
          value={symbol}
          error={symbol.length > 0 ? symbolError : undefined}
          onChange={({ currentTarget }) => onChange({ symbol: currentTarget.value })}
        />
        <WizardInput
          label="Decimals"
          value={decimals || undefined}
          type="number"
          error={decimalsError}
          onChange={({ currentTarget }) => {
            const newDecimals = Number(currentTarget.value);
            onChange({ decimals: isNaN(newDecimals) ? undefined : newDecimals });
          }}
        />
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
          label="Project URL"
          placeholder="Type project name"
          value={project}
          error={project !== undefined && project?.length > 0 ? projectError : undefined}
          onChange={({ currentTarget }) => onChange({ project: currentTarget.value })}
          helpText='Should point to a project repository'
        />
      </Stack>
    </WizardStep>
  );
};
