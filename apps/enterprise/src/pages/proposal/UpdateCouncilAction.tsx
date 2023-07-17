import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import * as councilConfigView from './helpers/councilConfigView';
import { ProposalActionDiff } from './ProposalActionDiff';
import { Address } from 'chain/components/Address';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';

export const UpdateCouncilAction = () => {
  const { dao } = useCurrentProposal();
  const { msg } = useCurrentProposalAction() as { msg: enterprise.UpdateCouncilMsg };

  const { dao_council } = msg;

  if (!dao_council) {
    return <Text weight="semibold"> Proposal to remove council</Text>;
  }

  const { members, allowed_proposal_action_types } = dao_council;

  return (
    <VStack gap={40}>
      <Panel>
        <TitledSection title="Configuration">
          <ProposalActionDiff
            fieldNameRecord={councilConfigView.councilConfigViewFieldNameRecord}
            oldView={councilConfigView.fromDao(dao)}
            updatedFields={councilConfigView.getUpdatedFields(dao_council)}
          />
        </TitledSection>
      </Panel>
      <VStack gap={24}>
        <Text weight="semibold">New council members</Text>
        <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
          {members.map((member) => (
            <Panel key={member}>
              <Address value={member} />
            </Panel>
          ))}
        </SameWidthChildrenRow>
      </VStack>
      {allowed_proposal_action_types && (
        <VStack gap={24}>
          <Text weight="semibold">New council proposal types allowed</Text>
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
