import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface VoteDurationInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const VoteDurationInput = ({ value, onChange }: VoteDurationInputProps) => {
  return (
    <FormControl label="Vote duration" helpText="The duration of proposals before they end.">
      <SliderInput
        value={value}
        min={1}
        max={60}
        formatValue={(v) => `${v} days`}
        onChange={(_, value) => onChange(value as number)}
      />
    </FormControl>
  );
};
