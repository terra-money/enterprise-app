import { useState } from "react";
import { ProposalForm } from "../shared/ProposalForm";
import { MinimumWeightForRewardsInput } from "pages/create-dao/MinimumWeightForRewardsInput";
import { useCurrentDaoMinimumWeightForRewards } from "./CurrentDAOMinimumWeightForRewardsProvider";

export const UpdateMinimumWeightForRewardsForm = () => {
  const currentValue = useCurrentDaoMinimumWeightForRewards()
  const [value, setValue] = useState<number | undefined>(currentValue);
  const error = isNaN(Number(value)) ? 'Invalid number' : undefined

  return (
    <ProposalForm
      disabled={error !== undefined}
      getProposalActions={() => [
        {
          update_minimum_weight_for_rewards: {
            minimum_weight_for_rewards: (value as number).toString(),
          }
        },
      ]}
    >
      <MinimumWeightForRewardsInput
        value={value}
        onChange={setValue}
        error={error}
      />
    </ProposalForm>
  );
}