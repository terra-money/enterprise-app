import { WithHint } from 'lib/ui/WithHint';
import { AmountInput } from 'lib/ui/inputs/Slider/AmountInput';
import { pluralize } from 'lib/ui/utils/pluralize';

export interface VoteDurationInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export const VoteDurationInput = ({ value, onChange, error }: VoteDurationInputProps) => {
  return (
    <AmountInput
      step={1}
      label={<WithHint hint="The amount of time proposals are open for voting.">Vote duration</WithHint>}
      onChange={onChange}
      formatValue={(v) => pluralize(v, 'day')}
      value={value}
      min={1}
      max={60}
      error={error}
    />
  );
};
