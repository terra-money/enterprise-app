import { HStack, VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { Text } from 'lib/ui/Text';
import { Address } from 'chain/components/Address';

export const MembersReview = () => {
  const {
    formState: { members },
  } = useDaoWizardForm();

  return (
    <VStack gap={2}>
      {members.map(({ addr, weight }, index) => {
        return (
          <HStack key={index} gap={4} alignItems="center">
            <Text>{index + 1}.</Text>
            <LabeledValue name={<Address value={addr} />}>{weight}</LabeledValue>
          </HStack>
        );
      })}
    </VStack>
  );
};
