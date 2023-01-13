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
      helpText="The minimum proportion of Veto votes for the proposal to be rejected. For example, 51% threshold would mean that there needs to be 51% of veto votes for the proposal to get rejected."
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
