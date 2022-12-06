import { PropsWithChildren } from 'react';
import { Container } from '@terra-money/apps/components';
import { Logo } from './Logo';
import { ReactComponent as ChatIcon } from 'components/assets/Chat.svg';
import { useNavigate } from 'react-router';
import { Favourites } from './Favourites';
import { IconButton, Tooltip } from 'components/primitives';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { Path } from 'navigation';
import styles from './NavigationLayout.module.sass';
import { useIsScreenWidthLessThan } from 'lib/ui/hooks/useIsScreenWidthLessThan';
import { MobileNavigation } from './MobileNavigation';
import { CreateDaoButton } from 'dao/components/CreateDaoButton';
import { DashboardButton } from 'dao/components/DashboardButton';

interface NavigationLayoutProps extends PropsWithChildren {}

export const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const navigate = useNavigate();

  const connectedWallet = useConnectedWallet();

  const isMobile = useIsScreenWidthLessThan(768);

  if (isMobile) {
    return <MobileNavigation>{children}</MobileNavigation>;
  }

  return (
    <Container className={styles.root} direction="row">
      <Container className={styles.navigation} direction="column">
        <Logo compact={true} onClick={() => navigate(Path.Landing)} />
        <Container className={styles.menu} direction="column">
          <Tooltip title="Dashboard" placement="right" arrow={true}>
            <DashboardButton />
          </Tooltip>
          <Favourites className={styles.favourites} />
          <Tooltip title="Got feedback?" placement="right" arrow={true}>
            <IconButton
              className={styles.feedback}
              variant="outline"
              onClick={() => window.open('https://terra.sc/enterprisefeedback')}
            >
              <ChatIcon />
            </IconButton>
          </Tooltip>
          {connectedWallet && (
            <div className={styles.create}>
              <Tooltip title="Create a DAO" placement="right" arrow={true}>
                <CreateDaoButton />
              </Tooltip>
            </div>
          )}
        </Container>
      </Container>
      <Container className={styles.content} direction="column">
        {children}
      </Container>
    </Container>
  );
};
