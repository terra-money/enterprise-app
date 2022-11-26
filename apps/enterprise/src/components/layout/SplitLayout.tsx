import { Container } from '@terra-money/apps/components';
import { ReactNode } from 'react';
import styles from './SplitLayout.module.sass';

export interface SplitLayoutProps {
  children1: ReactNode;
  children2?: ReactNode;
}

export const SplitLayout = (props: SplitLayoutProps) => {
  const { children1, children2 } = props;
  return (
    <Container className={styles.root}>
      {children1}
      {children2}
    </Container>
  );
};
