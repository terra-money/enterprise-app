import { Address } from 'components/address';
import { Panel } from 'components/panel';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { enterprise } from 'types/contracts';

export const UpdateCouncilAction = () => {
  const { msg } = useCurrentProposalAction() as { msg: enterprise.UpdateCouncilMsg };

  const { dao_council } = msg;

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
