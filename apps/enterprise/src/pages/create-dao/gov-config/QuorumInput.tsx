import { SliderInput } from 'components/primitives';
import { FormControl } from 'components/form-control';

export interface QuorumInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const QuorumInput = ({ value, onChange }: QuorumInputProps) => {
  return (
    <FormControl
      label="Quorum"
      helpText="The portion of total available votes cast in a proposal to consider it valid e.g. quorum of 30% means that 30% of all available votes have to be cast in the proposal, otherwise it fails automatically when it expires."
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
