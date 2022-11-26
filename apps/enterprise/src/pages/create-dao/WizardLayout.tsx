import { AnimatedPage, Container } from '@terra-money/apps/components';
import { ReactNode } from 'react';
import { StepProgress } from './StepProgress';
import styles from './WizardLayout.module.sass';

export interface WizardLayoutProps {
  percentageComplete: number;
  children: ReactNode;
  footer: ReactNode;
}

export const WizardLayout = (props: WizardLayoutProps) => {
  const { children, footer, percentageComplete } = props;

  return (
    <AnimatedPage className={styles.root}>
      <StepProgress percentageComplete={percentageComplete} />
      <Container className={styles.body} direction="column">
        {children}
      </Container>
      <Container className={styles.footer} direction="row">
        {footer}
      </Container>
    </AnimatedPage>
  );
};
