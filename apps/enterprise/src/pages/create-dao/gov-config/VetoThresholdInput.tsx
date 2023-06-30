import { toPercents } from 'lib/shared/utils/toPercents';
import { WithHint } from 'lib/ui/WithHint';
import { AmountInput } from 'lib/ui/inputs/Slider/AmountInput';

export interface VetoThresholdInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export const VetoThresholdInput = ({ value, onChange, error }: VetoThresholdInputProps) => {
  return (
    <AmountInput
      error={error}
      label={
        <WithHint hint="The minimum proportion of Veto votes required to reject a proposal. For example, a 30% veto threshold means that a proposal will fail if more than 30% of the votes are Veto.">
          Veto threshold
        </WithHint>
      }
      value={value}
      step={0.01}
      min={0}
      max={1}
      formatValue={(v) => toPercents(v, 'round')}
      onChange={onChange}
    />
  );
};
