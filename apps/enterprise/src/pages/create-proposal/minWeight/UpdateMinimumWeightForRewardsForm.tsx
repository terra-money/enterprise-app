import { useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { MinimumWeightForRewardsInput } from 'pages/create-dao/MinimumWeightForRewardsInput';
import { useCurrentDaoMinimumWeightForRewards } from './CurrentDAOMinimumWeightForRewardsProvider';
import { useCurrentDaoToken } from 'dao/components/CurrentDaoTokenProvider';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { toChainAmount } from 'chain/utils/toChainAmount';

interface UpdateMinimumWeightForRewardsFormProps {
  initialValue: number;
  formatValue: (value: number) => string;
}

export const UpdateMinimumWeightForRewardsForm = ({
  initialValue,
  formatValue,
}: UpdateMinimumWeightForRewardsFormProps) => {
  const [value, setValue] = useState<number | undefined>(initialValue);

  const error = isNaN(Number(value)) ? 'Invalid number' : undefined;

  const isDisabled = error !== undefined;

  return (
    <ProposalForm
      disabled={isDisabled}
      getProposalActions={() => {
        return [
          {
            update_minimum_weight_for_rewards: {
              minimum_weight_for_rewards: formatValue(value || 0),
            },
          },
        ];
      }}
    >
      <MinimumWeightForRewardsInput value={value} onChange={setValue} error={error} />
    </ProposalForm>
  );
};

export const UpdateMinimumWeightForRewardsFormTokenDao = () => {
  const value = useCurrentDaoMinimumWeightForRewards();
  const token = useCurrentDaoToken();

  return (
    <UpdateMinimumWeightForRewardsForm
      initialValue={fromChainAmount(value, token.decimals)}
      formatValue={(value) => toChainAmount(value, token.decimals)}
    />
  );
};

export const UpdateMinimumWeightForRewardsFormMultisigOrNftDao = () => {
  const value = useCurrentDaoMinimumWeightForRewards();

  return <UpdateMinimumWeightForRewardsForm initialValue={value} formatValue={(value) => value.toString()} />;
};
