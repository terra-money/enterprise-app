import { VStack } from "lib/ui/Stack";
import { useDaoWizardForm } from "../DaoWizardFormProvider";
import { Text } from "lib/ui/Text";

export const CouncilReview = () => {
  const { formState: { council } } = useDaoWizardForm();

  if (!council?.members.length) {
    return <Text>No council</Text>
  }

  const { members } = council;

  return (
    <VStack gap={4}>
      <VStack>
        <Text weight="bold">Members:</Text>
        {members.map((member, index) => {
          return (
            <Text>
              {index + 1}. {member.address}
            </Text>
          )
        })}
      </VStack>
    </VStack>
  );
}