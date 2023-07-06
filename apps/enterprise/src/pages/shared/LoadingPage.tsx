import { ReactNode } from 'react';
import styles from './LoadingPage.module.sass';
import { Spinner } from 'lib/ui/Spinner';

interface LoadingPageProps {
  isLoading: boolean;
  children: ReactNode;
}

export const LoadingPage = (props: LoadingPageProps) => {
  const { isLoading, children } = props;

  return isLoading ? (
    <div className={styles.root}>
      <Spinner />
    </div>
  ) : (
    <>{children}</>
  );
};
