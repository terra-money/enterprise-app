import { Text } from "lib/ui/Text"
import { useCurrentProposalAction } from "dao/components/CurrentProposalActionProvider";
import { enterprise } from "types/contracts";

export const UpdateMinimumWeightForRewardsAction = () => {
  const { msg } = useCurrentProposalAction();

  const newValue = (msg as enterprise.UpdateMinimumWeightForRewardsMsg).minimum_weight_for_rewards

  return (
    <Text color="supporting">
      Update minimum weight for rewards to <Text as="span" color="regular" weight="bold">{newValue}</Text>
    </Text>
  )
}