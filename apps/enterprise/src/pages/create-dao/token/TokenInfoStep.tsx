import { VStack } from 'lib/ui/Stack';
import { TokenInfo, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardStep } from '../WizardStep';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { WithHint } from 'lib/ui/WithHint';

export const TokenInfoStep = () => {
  const { formState, formInput } = useDaoWizardForm();
  const {
    tokenInfo: {
      decimals,
      decimalsError,
      name,
      nameError,
      symbol,
      symbolError,
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

  const onChange = (params: Partial<TokenInfo>) => {
    formInput({ tokenInfo: { ...formState.tokenInfo, ...params } });
  };

  return (
    <WizardStep title="Create your token">
      <VStack gap={16}>
        <TextInput
          label="Token Name"
          placeholder="Enter a name for your token"
          value={name}
          error={name.length > 0 ? nameError : undefined}
          onValueChange={(name) => onChange({ name })}
        />
        <TextInput
          label="Token Symbol"
          placeholder="Enter a symbol for your token"
          value={symbol}
          error={symbol.length > 0 ? symbolError : undefined}
          onValueChange={(symbol) => onChange({ symbol })}
        />
        <TextInput
          label="Decimals"
          value={decimals || undefined}
          type="number"
          error={decimalsError}
          onValueChange={(value) => {
            const newDecimals = Number(value);
            onChange({ decimals: isNaN(newDecimals) ? undefined : newDecimals });
          }}
        />
        <TextInput
          label="Description"
          placeholder="Enter a description for your token"
          value={description}
          error={description !== undefined && description?.length > 0 ? descriptionError : undefined}
          onValueChange={(description) => onChange({ description })}
        />
        <TextInput
          label="Logo URL"
          placeholder="Enter a logo url"
          value={logo}
          error={logo !== undefined && logo?.length > 0 ? logoError : undefined}
          onValueChange={(logo) => onChange({ logo })}
        />
        <TextInput
          label={
            <WithHint hint="A Marketing owner can update the description and project name">
              Marketing Owner Address
            </WithHint>
          }
          placeholder="Enter a wallet address"
          value={marketingOwner}
          error={marketingOwner !== undefined && marketingOwner?.length > 0 ? marketingOwnerError : undefined}
          onValueChange={(marketingOwner) => onChange({ marketingOwner })}
        />
        <TextInput
          label={<WithHint hint="This URL should point to a project website">Project URL</WithHint>}
          placeholder="Enter your project's URL"
          value={project}
          error={project !== undefined && project?.length > 0 ? projectError : undefined}
          onValueChange={(project) => onChange({ project })}
        />
      </VStack>
    </WizardStep>
  );
};
