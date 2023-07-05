import { WithHint } from 'lib/ui/WithHint';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';

export interface MinimumDepositInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const MinimumDepositInput = ({ value, onChange, error }: MinimumDepositInputProps) => {
  return (
    <AmountTextInput
      label={<WithHint hint="The minimum deposit amount required to create a proposal.">Minimum deposit</WithHint>}
      value={value}
      placeholder="Enter a minimum deposit amount"
      error={error}
      onValueChange={onChange}
    />
  );
};
