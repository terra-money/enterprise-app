import { useState } from "react";
import { ProposalForm } from "./shared/ProposalForm";
import { MinimumWeightForRewardsInput } from "pages/create-dao/MinimumWeightForRewardsInput";

export const UpdateMinimumWeightForRewardsForm = () => {
  // TODO: get current minimum weight from the DAO
  const currentValue = 0
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