import { Text } from 'components/primitives';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';

export const UpgradeProposalAction = () => {
  const { msg } = useCurrentProposalAction() as { msg: enterprise.UpgradeDaoMsg };

  return <Text variant="heading4">Upgrade Code Id to {msg.new_dao_code_id}</Text>;
};
