import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface QuorumInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export const QuorumInput = ({ value, onChange, min = 0 }: QuorumInputProps) => {
  return (
    <FormControl
      label="Quorum"
      helpText="The minimum percentage of voting power that needs to vote on a proposal for the result to be valid. For example, a quorum of 30% means that more than 30% of all possible votes must be cast, otherwise the proposal fails."
    >
      <SliderInput
        value={value}
        step={0.01}
        min={min}
        max={1}
        formatValue={(v) => `${Math.floor(v * 100)}%`}
        onChange={(_, value) => onChange(value as number)}
      />
    </FormControl>
  );
};
