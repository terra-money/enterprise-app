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
      helpText="The portion of votes assigned to a single option from all the votes cast in the given proposal required to determine the 'winning' option e.g. 51% threshold means that an option has to have at least 51% of the cast votes to win."
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
