import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface ThresholdInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const ThresholdInput = ({ value, onChange }: ThresholdInputProps) => {
  return (
    <FormControl
      label="Threshold"
      helpText="The minimum proportion of Yes votes for the proposal to be accepted. For example, 51% threshold would mean that there needs to be 51% of yes votes for the proposal to go through."
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
