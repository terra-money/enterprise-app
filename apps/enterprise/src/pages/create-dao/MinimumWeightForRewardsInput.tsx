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
      helpText="The minimum weight a DAO member needs in order to qualify for rewards. For example, in a token or NFT DAO, a value of 3 means that a user needs at least 3 staked assets to receive rewards. For multisigs, it is a minimum vote weight. "
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
