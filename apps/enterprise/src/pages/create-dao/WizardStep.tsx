import { Container, ScrollableContainer } from '@terra-money/apps/components';
import { ReactNode, useRef, useState } from 'react';
import { StepLabel } from './StepLabel';
import { WizardBody } from './WizardBody';
import { Text } from 'components/primitives';
import styles from './WizardStep.module.sass';
import { useDaoWizardForm } from './DaoWizardFormProvider';

export interface WizardStepProps {
  children?: ReactNode;
  helpContent?: ReactNode;
  title: string;
  subTitle?: string;
}

export function WizardStep(props: WizardStepProps) {
  const {
    formState: { steps, type },
  } = useDaoWizardForm();
  const { children, helpContent, title, subTitle } = props;

  const [headerVisible, setHeaderVisible] = useState(false);

  const stickyRef = useRef<HTMLDivElement>(null);

  return (
    <WizardBody helpContent={helpContent}>
      <Container className={styles.root} direction="column">
        <StepLabel
          className={styles.stepLabel}
          steps={steps}
          type={type}
          description={headerVisible ? title : undefined}
        />
        <ScrollableContainer
          className={styles.scrollableContainer}
          stickyRef={stickyRef}
          threshold={0.5}
          onHeaderVisibilityChange={setHeaderVisible}
        >
          <div ref={stickyRef} className={styles.header}>
            <Text variant="heading2">{title}</Text>
            {subTitle && (
              <Text variant="text" component="p">
                {subTitle}
              </Text>
            )}
          </div>
          <Container className={styles.section} direction="column" component="section">
            {children}
          </Container>
        </ScrollableContainer>
      </Container>
    </WizardBody>
  );
}
