import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { ErrorData, ErrorDataProps } from './ErrorData';
import { VStack } from 'lib/ui/Stack';
import { SupportContacts } from './SupportContacts';

export const GenericErrorFallback = (errorDataProps: ErrorDataProps) => (
  <TitledSection title="Something went wrong">
    <VStack gap={16}>
      <SupportContacts />
      <ErrorData {...errorDataProps} />
    </VStack>
  </TitledSection>
);
