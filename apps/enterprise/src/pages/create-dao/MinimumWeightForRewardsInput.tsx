import { WithHint } from 'lib/ui/WithHint';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';

export interface MinimumWeightForRewardsInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const MinimumWeightForRewardsInput = ({ value, onChange, error }: MinimumWeightForRewardsInputProps) => {
  return (
    <AmountTextInput
      label={
        <WithHint hint="The minimum weight a DAO member needs in order to qualify for rewards. For example, in a token or NFT DAO, a value of 3 means that a user needs at least 3 staked assets to receive rewards. For multisigs, it is a minimum vote weight.">
          Minimum weight for rewards
        </WithHint>
      }
      value={value}
      placeholder="Enter minimum weight"
      error={error}
      onValueChange={onChange}
    />
  );
};
