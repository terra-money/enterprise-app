import { VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { Text } from 'lib/ui/Text';
import { Address } from 'chain/components/Address';
import { councilProposalActionTypeName, CouncilProposalActionType } from '../shared/ProposalTypesInput';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { toPercents } from 'lib/shared/utils/toPercents';

export const CouncilReview = () => {
  const {
    formState: { council },
  } = useDaoWizardForm();

  if (!council?.members.length) {
    return <Text>No council</Text>;
  }

  const { members, allowedProposalTypes, quorum, threshold } = council;

  return (
    <>
      <VStack gap={2}>
        <LabeledValue name="Members" />
        {members.map((member, index) => {
          return (
            <Text key={index}>
              {index + 1}. <Address value={member.address} />
            </Text>
          );
        })}
      </VStack>
      <VStack gap={2}>
        <LabeledValue name="Allowed proposal types" />
        {allowedProposalTypes.map((proposalType, index) => (
          <Text>
            {index + 1}. {councilProposalActionTypeName[proposalType as CouncilProposalActionType] ?? proposalType}
          </Text>
        ))}
      </VStack>
      <LabeledValue name="Quorum">{toPercents(quorum, 'round')}</LabeledValue>
      <LabeledValue name="Threshold">{toPercents(threshold, 'round')}</LabeledValue>
    </>
  );
};
