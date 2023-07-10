import { Text } from 'lib/ui/Text';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCW20TokenInfoQuery } from 'queries';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export const UpdateMinimumWeightForRewardsAction = () => {
  const { msg } = useCurrentProposalAction();

  const { dao_membership_contract, dao_type } = useCurrentDao();
  const isTokenDao = dao_type === 'token';
  const { data: token } = useCW20TokenInfoQuery(dao_membership_contract, { enabled: isTokenDao });

  if (isTokenDao && !token) return null;

  const newValue = (msg as enterprise.UpdateMinimumWeightForRewardsMsg).minimum_weight_for_rewards;

  return (
    <Text color="supporting">
      Update the minimum weight for rewards to{' '}
      <Text as="span" color="regular" weight="bold">
        {isTokenDao ? fromChainAmount(newValue, assertDefined(token)?.decimals) : newValue}
      </Text>
    </Text>
  );
};
