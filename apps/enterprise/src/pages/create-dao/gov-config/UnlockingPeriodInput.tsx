import { pluralize } from 'lib/shared/utils/pluralize';
import { WithHint } from 'lib/ui/WithHint';
import { AmountInput } from 'lib/ui/inputs/Slider/AmountInput';

export interface UnlockingPeriodProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export const UnlockingPeriodInput = ({ value, error, onChange }: UnlockingPeriodProps) => {
  return (
    <AmountInput
      label={
        <WithHint hint="The amount of time that must pass before unstaked tokens become claimable.">
          Unlocking period
        </WithHint>
      }
      step={1}
      error={error}
      value={value}
      min={1}
      max={90}
      formatValue={(v) => pluralize(v, 'day')}
      onChange={onChange}
    />
  );
};
