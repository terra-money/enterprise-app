import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface VoteDurationInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const VoteDurationInput = ({ value, onChange }: VoteDurationInputProps) => {
  return (
    <FormControl label="Vote duration" helpText="The amount of time proposals are open for voting.">
      <SliderInput
        value={value}
        min={1}
        max={60}
        formatValue={(v) => `${v} minutes`}
        onChange={(_, value) => onChange(value as number)}
      />
    </FormControl>
  );
};
