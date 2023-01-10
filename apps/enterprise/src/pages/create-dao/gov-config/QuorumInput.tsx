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
      helpText="The minimum percentage of voting power that needs to be cast on a proposal for the result to be valid. For example, quorum of 30% means that 30% of all available votes have to be cast in the proposal, otherwise it fails automatically upon expiration."
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
