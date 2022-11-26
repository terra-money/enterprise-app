import { PropsWithChildren, ReactNode } from 'react';
import { AnimatedPage, Container } from '@terra-money/apps/components';
import { WalletConnectionButton } from 'components/wallet-connection-button';
import styles from './PageLayout.module.sass';

interface PageLayoutProps extends PropsWithChildren {
  header: ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { header, children } = props;
  return (
    <AnimatedPage className={styles.root}>
      <Container className={styles.header} direction="row">
        <Container className={styles.content} direction="row">
          {header}
        </Container>
        <WalletConnectionButton className={styles.wallet} />
      </Container>
      {children}
    </AnimatedPage>
  );
};
