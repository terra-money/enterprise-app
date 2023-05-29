import { VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { Text } from 'lib/ui/Text';

export const InfoReview = () => {
  const {
    formState: {
      info: { name, description, logo },
    },
  } = useDaoWizardForm();

  return (
    <>
      <LabeledValue name="Name">{name}</LabeledValue>
      <LabeledValue name="Logo">{logo ?? '-'}</LabeledValue>
      <VStack>
        <LabeledValue name="Description" />
        <Text>{description}</Text>
      </VStack>
    </>
  );
};
