import { FormControl } from 'components/form-control';
import { FormTextInput } from 'components/form-text-input';

export interface MinimumDepositInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const MinimumDepositInput = ({ value, onChange, error }: MinimumDepositInputProps) => {
  return (
    <FormControl label="Minimum deposit" helpText="The minimum deposit amount required to create a proposal.">
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
    </FormControl>
  );
};
