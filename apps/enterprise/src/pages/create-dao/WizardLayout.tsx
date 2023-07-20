import { HStack, VStack } from 'lib/ui/Stack';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { StepProgress } from './StepProgress';

export interface WizardLayoutProps {
  percentageComplete: number;
  children: ReactNode;
  footer: ReactNode;
}

const Container = styled(VStack)`
  width: 100%;
  height: 100%;
  background-position: 100% 0%;
  background-size: 50% 100%;
  background-repeat: no-repeat;
  overflow-y: auto;

  @media (max-width: 1200px) {
    background-image: none;
  }
`;

const Content = styled(VStack)`
  flex: 1;
`;

const Footer = styled(HStack)`
  padding: 48px 0 64px 64px;

  @media (max-width: 768px) {
    padding: 0;
    padding-top: 32px;
  }
`;

export const WizardLayout = (props: WizardLayoutProps) => {
  const { children, footer, percentageComplete } = props;

  return (
    <Container>
      <StepProgress percentageComplete={percentageComplete} />
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </Container>
  );
};
