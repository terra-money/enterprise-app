import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { Modal } from 'lib/ui/Modal';
import { ExternalLink } from 'components/link';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Path, discordUrl, telegramUrl } from 'navigation';
import { UpgradeDaoCanFixTheError } from './UpgradeDaoCanFixTheError';
import { ErrorData } from 'errors/components/ErrorData';
import { Line } from 'lib/ui/Line';
import { useNavigate } from 'react-router';

export const DaoErrorBoundary = ({ children }: ComponentWithChildrenProps) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      fallback={(params) => (
        <Modal
          title="Something went wrong"
          renderContent={() => (
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
          )}
          onClose={() => navigate(Path.Dashboard)}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
