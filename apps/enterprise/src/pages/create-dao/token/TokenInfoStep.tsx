import { Stack } from '@mui/material';
import { TokenInfo, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';
import { WizardStep } from '../WizardStep';

export const TokenInfoStep = () => {
  const { formState, formInput } = useDaoWizardForm();
  const {
    tokenInfo: { decimals, decimalsError, name, nameError, symbol, symbolError },
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
      </Stack>
    </WizardStep>
  );
};
