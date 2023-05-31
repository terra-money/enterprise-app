import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { VStack } from 'lib/ui/Stack';
import { UpgradeDaoCanFixTheError } from './UpgradeDaoCanFixTheError';
import { ErrorData } from 'errors/components/ErrorData';
import { Line } from 'lib/ui/Line';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { SupportContacts } from 'errors/components/SupportContacts';

export const DaoErrorBoundary = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ErrorBoundary
      fallback={(params) => (
        <TitledSection title="Something went wrong">
          <VStack gap={16}>
            <SupportContacts />
            <Line />
            <UpgradeDaoCanFixTheError />
            <ErrorData {...params} />
          </VStack>
        </TitledSection>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
