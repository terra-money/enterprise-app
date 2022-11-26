import { Throbber } from 'components/primitives';
import { ReactNode } from 'react';
import styles from './LoadingPage.module.sass';

interface LoadingPageProps {
  isLoading: boolean;
  children: ReactNode;
}

export const LoadingPage = (props: LoadingPageProps) => {
  const { isLoading, children } = props;

  return isLoading ? (
    <div className={styles.root}>
      <Throbber />
    </div>
  ) : (
    <>{children}</>
  );
};
