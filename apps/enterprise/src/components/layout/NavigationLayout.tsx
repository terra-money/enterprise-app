import { PropsWithChildren } from 'react';
import { Container } from '@terra-money/apps/components';
import { Logo } from './Logo';
import { ReactComponent as HomeIcon } from 'components/assets/Home.svg';
import { ReactComponent as PlusIcon } from 'components/assets/Plus.svg';
import { ReactComponent as ChatIcon } from 'components/assets/Chat.svg';
import { useNavigate } from 'react-router';
import { Favourites } from './Favourites';
import { IconButton, Tooltip } from 'components/primitives';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { Path } from 'navigation';
import styles from './NavigationLayout.module.sass';

interface NavigationLayoutProps extends PropsWithChildren {}

export const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const navigate = useNavigate();

  const connectedWallet = useConnectedWallet();

  return (
    <Container className={styles.root} direction="row">
      <Container className={styles.navigation} direction="column">
        <Logo compact={true} onClick={() => navigate(Path.Landing)} />
        <Container className={styles.menu} direction="column">
          <Tooltip title="Dashboard" placement="right" arrow={true}>
            <IconButton onClick={() => navigate(Path.Dashboard)}>
              <HomeIcon />
            </IconButton>
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
            <Tooltip title="Create a DAO" placement="right" arrow={true}>
              <IconButton className={styles.create} variant="primary" onClick={() => navigate('/dao/create')}>
                <PlusIcon className={styles.icon} />
              </IconButton>
            </Tooltip>
          )}
        </Container>
      </Container>
      <Container className={styles.content} direction="column">
        {children}
      </Container>
    </Container>
  );
};
