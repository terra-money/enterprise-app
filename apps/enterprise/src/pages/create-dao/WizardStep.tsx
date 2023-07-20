import { ReactNode } from 'react';
import { StepLabel } from './StepLabel';
import { WizardBody } from './WizardBody';
import { Text } from 'lib/ui/Text';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import { VStack } from 'lib/ui/Stack';
import styled from 'styled-components';

export interface WizardStepProps {
  children?: ReactNode;
  helpContent?: ReactNode;
  title: string;
  subTitle?: string;
}

const Container = styled(VStack)`
  padding: 24px 64px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export function WizardStep(props: WizardStepProps) {
  const {
    formState: { steps, type },
  } = useDaoWizardForm();
  const { children, helpContent, title, subTitle } = props;

  return (
    <WizardBody helpContent={helpContent}>
      <Container gap={64} fullWidth fullHeight>
        <StepLabel steps={steps} type={type} description={title} />
        <div>
          <Text size={32} weight="bold">
            {title}
          </Text>
          {subTitle && (
            <Text size={14} color="supporting">
              {subTitle}
            </Text>
          )}
        </div>
        <VStack>{children}</VStack>
      </Container>
    </WizardBody>
  );
}
