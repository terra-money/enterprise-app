import { toPercents } from 'lib/shared/utils/toPercents';
import { WithHint } from 'lib/ui/WithHint';
import { AmountInput } from 'lib/ui/inputs/Slider/AmountInput';

export interface ThresholdInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  error?: string;
}

export const ThresholdInput = ({ value, onChange, error, min = 0 }: ThresholdInputProps) => {
  return (
    <AmountInput
      error={error}
      label={
        <WithHint hint="The minimum proportion of Yes votes needed for the proposal to pass. For example, a 55% threshold means that a proposal needs at least 55% Yes votes to pass.">
          Threshold
        </WithHint>
      }
      value={value}
      min={min}
      max={1}
      step={0.01}
      formatValue={(v) => toPercents(v, 'round')}
      onChange={onChange}
    />
  );
};
