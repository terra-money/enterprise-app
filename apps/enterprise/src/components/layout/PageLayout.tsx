import { PropsWithChildren, ReactNode } from 'react';
import { AnimatedPage, Container } from '@terra-money/apps/components';
import styles from './PageLayout.module.sass';
import { ManageWallet } from 'chain/components/ManageWallet';
import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { GenericErrorFallback } from 'errors/components/GenericErrorFallback';

interface PageLayoutProps extends PropsWithChildren {
  header: ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { header, children } = props;
  return (
    <AnimatedPage className={styles.root}>
      <ErrorBoundary fallback={params => (
        <GenericErrorFallback {...params} />
      )}>
        <Container className={styles.header} direction="row">
          <Container className={styles.content} direction="row">
            {header}
          </Container>
          <div className={styles.wallet}>
            <ManageWallet />
          </div>
        </Container>
        {children}
      </ErrorBoundary>
    </AnimatedPage>
  );
};
