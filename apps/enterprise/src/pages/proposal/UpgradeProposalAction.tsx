import { Text } from 'components/primitives';
import { useCurrentProposal } from './CurrentProposalProvider';

export const UpgradeProposalAction = () => {
  const { proposal_actions } = useCurrentProposal();

  const action = proposal_actions.find((action) => 'upgrade_dao' in action);
  if (!action) return null;

  const upgradeDaoAction = 'upgrade_dao' in action ? action.upgrade_dao : undefined;
  if (!upgradeDaoAction) return null;

  return <Text variant="heading4">Upgrade Code Id to {upgradeDaoAction.new_dao_code_id}</Text>;
};
