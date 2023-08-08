import { Text } from 'lib/ui/Text';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';

export const UpgradeProposalAction = () => {
  const { msg } = useCurrentProposalAction() as { msg: enterprise.UpgradeDaoMsg };

  return <Text weight="semibold">Upgrade Code Id to {msg.new_dao_code_id}</Text>;
};
