import { useRef } from 'react';
import { Header } from '../Header';
import { AnimatedPage } from '@terra-money/apps/components';
import { CreateProposalFooter } from '../CreateProposalFooter';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';

interface ProposalFormContainerProps {
  title: string;
  children: React.ReactNode;
  loading: boolean;
  onSubmit: () => void;
  disabled: boolean;
}

const Container = styled(VStack)`
  height: 100%;
  width: 100%;
  padding: 48px 48px 0 48px;
  gap: 32px;

  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const ProposalFormContainer = ({ title, children, loading, onSubmit, disabled }: ProposalFormContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <AnimatedPage>
      <Container>
        <Header ref={ref} title={title} />
        <Content>
          <VStack gap={32}>{children}</VStack>
        </Content>
        <CreateProposalFooter loading={loading} onSubmit={onSubmit} disabled={disabled} />
      </Container>
    </AnimatedPage>
  );
};
