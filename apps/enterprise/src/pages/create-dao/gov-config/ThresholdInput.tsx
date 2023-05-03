import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface ThresholdInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export const ThresholdInput = ({ value, onChange, min = 0 }: ThresholdInputProps) => {
  return (
    <FormControl
      label="Threshold"
      helpText="The minimum proportion of Yes votes necessary for the proposal to pass. For example, a 51% threshold means that a proposal needs at least 51% Yes votes to pass."
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
