import { FormControl } from 'components/form-control';
import { FormTextInput } from 'components/form-text-input';

export interface MinimumWeightForRewardsInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const MinimumWeightForRewardsInput = ({ value, onChange, error }: MinimumWeightForRewardsInputProps) => {
  return (
    <FormControl
      label="Minimum weight for rewards"
      helpText="The minimum weight a DAO member needs in order to qualify for rewards. For example, a value of 3 means that a user in a token or NFT DAO needs at least 3 voting shares to receive rewards"
    >
      <FormTextInput
        value={value === undefined ? '' : value}
        type="number"
        placeholder="Enter minimum weight"
        error={error}
        onChange={({ currentTarget }) => {
          if (currentTarget.value === '') {
            onChange(undefined);
            return;
          }

          const newValue = Number(currentTarget.value);
          if (isNaN(newValue) || newValue < 0) {
            return;
          }

          onChange(newValue);
        }}
      />
    </FormControl>
  );
};
