import { VStack } from "lib/ui/Stack";
import { useDaoWizardForm } from "../DaoWizardFormProvider";
import { Text } from "lib/ui/Text";
import { toPercents } from "@terra-money/apps/utils";
import { Address } from "chain/components/Address";
import { councilProposalActionTypeName, CouncilProposalActionType } from "../shared/ProposalTypesInput";

export const CouncilReview = () => {
  const { formState: { council } } = useDaoWizardForm();

  if (!council?.members.length) {
    return <Text>No council</Text>
  }

  const { members, allowedProposalTypes, quorum, threshold } = council;

  return (
    <VStack gap={8}>
      <VStack gap={2}>
        <Text color="supporting" >Members:</Text>
        {members.map((member, index) => {
          return (
            <Text key={index}>
              {index + 1}. <Address value={member.address} />
            </Text>
          )
        })}
      </VStack>
      <VStack gap={2}>
        <Text color="supporting" >Allowed proposal types:</Text>
        {allowedProposalTypes.map((proposalType, index) => (
          <Text >
            {index + 1}. {councilProposalActionTypeName[proposalType as CouncilProposalActionType] ?? proposalType}
          </Text>
        ))}
      </VStack>
      <Text color="supporting">Quorum: <Text as="span" color="regular">{toPercents(quorum, 'round')}</Text></Text>
      <Text color="supporting">Threshold: <Text as="span" color="regular">{toPercents(threshold, 'round')}</Text></Text>
    </VStack >
  );
}