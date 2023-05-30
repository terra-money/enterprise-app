import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ExternalLink } from 'components/link';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { discordUrl, telegramUrl } from 'navigation';
import { UpgradeDaoCanFixTheError } from './UpgradeDaoCanFixTheError';
import { ErrorData } from 'errors/components/ErrorData';
import { Line } from 'lib/ui/Line';
import { TitledSection } from 'lib/ui/Layout/TitledSection';

export const DaoErrorBoundary = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ErrorBoundary
      fallback={(params) => (
        <TitledSection title="Something went wrong">
          <VStack gap={16}>
            <Text>
              Contact us on{' '}
              <ExternalLink to={discordUrl}>
                <ShyTextButton as="div" text="Discord" />
              </ExternalLink>{' '}
              or{' '}
              <ExternalLink to={telegramUrl}>
                <ShyTextButton as="div" text="Telegram" />
              </ExternalLink>{' '}
              if the problem persists.
            </Text>
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
