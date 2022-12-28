import { Address } from 'components/address';
import { Panel } from 'components/panel';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentProposal } from './CurrentProposalProvider';

export const UpdateCouncilAction = () => {
  const { proposal_actions } = useCurrentProposal();

  const action = proposal_actions.find((action) => 'update_council' in action);
  if (!action) return null;

  const updateCouncilAction = 'update_council' in action ? action.update_council : undefined;
  if (!updateCouncilAction) return null;

  const { dao_council } = updateCouncilAction;

  if (!dao_council) {
    return <Text weight="semibold"> Proposal to remove council</Text>;
  }

  const { members, allowed_proposal_action_types } = dao_council;

  return (
    <VStack gap={40}>
      <VStack gap={24}>
        <Text weight="semibold">New council members</Text>
        <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
          {members.map((member) => (
            <Panel key={member}>
              <Address address={member} />
            </Panel>
          ))}
        </SameWidthChildrenRow>
      </VStack>
      {allowed_proposal_action_types && (
        <VStack gap={24}>
          <Text weight="semibold">New council allowed proposal types</Text>
          <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
            {allowed_proposal_action_types.map((type) => (
              <Panel key={type}>
                <Text>{type}</Text>
              </Panel>
            ))}
          </SameWidthChildrenRow>
        </VStack>
      )}
    </VStack>
  );
};
