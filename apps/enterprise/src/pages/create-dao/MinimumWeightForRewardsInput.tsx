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
      helpText="Minimum weight that a DAO member should have in order to qualify for rewards. E.g. a value of 3 here means that a user in token or NFT DAO needs at least 3 staked DAO assets, or a weight of 3 in multisig DAO, to be eligible for rewards."
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
