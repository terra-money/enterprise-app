import { FormControl } from 'components/form-control';
import { FormTextInput } from 'components/form-text-input';

export interface MinimumDepositInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const MinimumDepositInput = ({ value, onChange, error }: MinimumDepositInputProps) => {
  return (
    <FormControl
      label="Minimum deposit"
      helpText="Minimum amount of DAO's governance unit to be required to create a deposit"
    >
      <FormTextInput
        value={value === undefined ? '' : value}
        type="number"
        placeholder="Enter minimum deposit"
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
