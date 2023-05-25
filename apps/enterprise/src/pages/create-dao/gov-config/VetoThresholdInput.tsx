import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface VetoThresholdInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const VetoThresholdInput = ({ value, onChange }: VetoThresholdInputProps) => {
  return (
    <FormControl
      label="Veto threshold"
      helpText="The minimum proportion of Veto votes required to reject a proposal. For example, a 30% veto threshold means that a proposal will fail if more than 30% of the votes are Veto."
    >
      <SliderInput
        value={value}
        step={0.01}
        min={0}
        max={1}
        formatValue={(v) => `${Math.floor(v * 100)}%`}
        onChange={(_, value) => onChange(value as number)}
      />
    </FormControl>
  );
};
