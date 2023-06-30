import { toPercents } from 'lib/shared/utils/toPercents';
import { WithHint } from 'lib/ui/WithHint';
import { AmountInput } from 'lib/ui/inputs/Slider/AmountInput';

export interface QuorumInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  error?: string;
}

export const QuorumInput = ({ value, onChange, min = 0, error }: QuorumInputProps) => {
  return (
    <AmountInput
      value={value}
      min={min}
      max={1}
      step={0.01}
      formatValue={(v) => toPercents(v, 'round')}
      onChange={onChange}
      error={error}
      label={
        <WithHint hint="The minimum percentage of voting power that needs to vote on a proposal for the result to be valid. For example, a quorum of 30% means that more than 30% of all possible votes must be cast, otherwise the proposal fails.">
          Quorum
        </WithHint>
      }
    />
  );
};
