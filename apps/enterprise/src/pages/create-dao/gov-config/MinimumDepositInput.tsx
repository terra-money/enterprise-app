import { FormTextInput } from 'components/form-text-input';
import { WithHint } from 'lib/ui/WithHint';
import { InputWrapper } from 'lib/ui/inputs/InputWrapper';

export interface MinimumDepositInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const MinimumDepositInput = ({ value, onChange, error }: MinimumDepositInputProps) => {
  return (
    <InputWrapper
      label={<WithHint hint="The minimum deposit amount required to create a proposal.">Minimum deposit</WithHint>}
    >
      <FormTextInput
        value={value === undefined ? '' : value}
        type="number"
        placeholder="Enter a minimum deposit amount"
        error={error}
        onChange={({ currentTarget }) => {
          if (currentTarget.value === '') {
            onChange(undefined);
            return;
          }

          const newValue = Number(currentTarget.value);
          if (isNaN(newValue) || newValue < 0) {
            return;
          }

          onChange(newValue);
        }}
      />
    </InputWrapper>
  );
};
