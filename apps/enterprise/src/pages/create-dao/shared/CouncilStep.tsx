import { TextInput } from 'lib/ui/inputs/TextInput';
import { Line } from 'lib/ui/Line';
import { HStack, VStack } from 'lib/ui/Stack';
import { CouncilMember, useDaoWizardForm } from '../DaoWizardFormProvider';
import { QuorumInput } from '../gov-config/QuorumInput';
import { ThresholdInput } from '../gov-config/ThresholdInput';
import { WizardStep } from '../WizardStep';
import { CouncilProposalActionType, ProposalTypesInput } from './ProposalTypesInput';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { updateAtIndex } from 'lib/shared/utils/updateAtIndex';
import { removeAtIndex } from 'lib/shared/utils/removeAtIndex';
import { AddButton } from 'lib/ui/buttons/AddButton';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

export function CouncilStep() {
  const {
    formInput,
    formState: { council: optionalCouncil, isValid },
  } = useDaoWizardForm();

  // TODO: temporary change
  const council = assertDefined(optionalCouncil);
  const { members, allowedProposalTypes } = council;

  const updateMembers = (members: CouncilMember[]) => formInput({ council: { ...council, members } });

  return (
    <WizardStep
      title="Add council members to your DAO"
      subTitle="(Optional) DAO Council members can create and vote on certain emergency proposals without having to go through general governance procedures."
    >
      <VStack gap={40}>
        <VStack gap={8}>
          <ProposalTypesInput
            value={allowedProposalTypes as CouncilProposalActionType[]}
            onChange={(allowedProposalTypes) => formInput({ council: { ...council, allowedProposalTypes } })}
            // error={council.allowedProposalTypesError}
          />
          <QuorumInput
            error={council.quorumError}
            value={council.quorum}
            onChange={(quorum) => formInput({ council: { ...council, quorum } })}
          />
          <ThresholdInput
            value={council.threshold}
            error={council.thresholdError}
            onChange={(threshold) => formInput({ council: { ...council, threshold } })}
          />
        </VStack>
        <Line />
        <VStack gap={8}>
          {members.map((member, index) => (
            <HStack gap={16} alignItems="center">
              <TextInput
                label={`Council member #${index + 1}`}
                placeholder="Enter council member's address"
                value={member.address}
                error={member.addressError}
                onValueChange={(address) =>
                  updateMembers(updateAtIndex(council.members, index, (value) => ({ ...value, address })))
                }
              />
              <DeleteButton size="l" onClick={() => updateMembers(removeAtIndex(council.members, index))} />
            </HStack>
          ))}
          {isValid && <AddButton size="l" onClick={() => updateMembers([...council.members, { address: '' }])} />}
        </VStack>
      </VStack>
    </WizardStep>
  );
}
