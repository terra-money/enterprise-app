import { Container } from '@terra-money/apps/components';
import { ReactNode } from 'react';
import styles from './WizardBody.module.sass';

export interface WizardBodyProps {
  children: ReactNode;
  helpContent?: ReactNode;
}

export const WizardBody = (props: WizardBodyProps) => {
  const { children, helpContent } = props;

  return (
    <Container className={styles.root} direction="column">
      <div className={styles.child1}>{children}</div>
      <div className={styles.child2}>{helpContent}</div>
    </Container>
  );
};
