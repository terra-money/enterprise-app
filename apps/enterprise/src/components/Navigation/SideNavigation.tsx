import { Logo } from 'components/layout/Logo';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { VStack } from 'lib/ui/Stack';
import { Path } from 'navigation';
import styled from 'styled-components';
import { DashboardButton } from 'dao/components/DashboardButton';
import { Favourites } from 'components/layout/Favourites';
import { CreateDaoButton } from 'dao/components/CreateDaoButton';
import { useConnectedWallet } from '@terra-money/use-wallet';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { ReactComponent as ChatIcon } from 'components/assets/Chat.svg';
import { ManageDaosButton } from 'dao/components/ManageDaosButton';
import { Tooltip } from 'lib/ui/Tooltip';
import { IconButton } from 'lib/ui/buttons/IconButton';
import { ThemeToggleButton } from 'lib/ui/theme/ThemeToggleButton';

const Container = styled(VStack)`
  padding: 32px;
  padding-bottom: 68px;
  align-items: flex-start;
  border-right: 1px solid ${({ theme }) => theme.colors.foreground.toCssValue()};
`;

export const SideNavigation = () => {
  const connectedWallet = useConnectedWallet();

  return (
    <Container fullHeight justifyContent="space-between">
      <VStack alignItems="center" gap={48}>
        <InternalLink to={Path.Landing}>
          <Logo compact />
        </InternalLink>
        <VStack gap={12}>
          <Tooltip
            content="Dashboard"
            placement="right"
            renderOpener={(props) => (
              <div {...props}>
                <DashboardButton />
              </div>
            )}
          />
          <Tooltip
            content="Manage your favourite DAOs"
            placement="right"
            renderOpener={(props) => (
              <div {...props}>
                <ManageDaosButton />
              </div>
            )}
          />
          <Favourites />
        </VStack>
      </VStack>
      <VStack gap={24} alignItems="center">
        <ThemeToggleButton />
        <Tooltip
          content="Got feedback?"
          placement="right"
          renderOpener={(props) => (
            <div {...props}>
              <ExternalLink to="https://terra.sc/enterprisefeedback">
                <IconButton kind="secondary" title="Feedback" icon={<ChatIcon />} size="l" as="div" />
              </ExternalLink>
            </div>
          )}
        />
        {connectedWallet && (
          <Tooltip
            content="Create a DAO"
            placement="right"
            renderOpener={(props) => (
              <div {...props}>
                <CreateDaoButton />
              </div>
            )}
          />
        )}
      </VStack>
    </Container>
  );
};
