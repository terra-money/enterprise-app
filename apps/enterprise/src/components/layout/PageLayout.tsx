import { PropsWithChildren, ReactNode } from 'react';
import styles from './PageLayout.module.sass';
import { ManageWallet } from 'chain/components/ManageWallet';
import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { GenericErrorFallback } from 'errors/components/GenericErrorFallback';
import { HStack } from 'lib/ui/Stack';

interface PageLayoutProps extends PropsWithChildren {
  header: ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { header, children } = props;
  return (
    <div className={styles.root}>
      <ErrorBoundary fallback={(params) => <GenericErrorFallback {...params} />}>
        <HStack fullWidth alignItems="center" className={styles.header}>
          <HStack fullWidth alignItems="center" className={styles.content}>
            {header}
          </HStack>
          <div className={styles.wallet}>
            <ManageWallet />
          </div>
        </HStack>
        {children}
      </ErrorBoundary>
    </div>
  );
};
