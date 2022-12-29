import { CreateProposalFooter } from '../CreateProposalFooter';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';

interface ProposalFormContainerProps {
  children: React.ReactNode;
  loading: boolean;
  onSubmit: () => void;
  disabled: boolean;
}

const Content = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const ProposalFormContainer = ({ children, loading, onSubmit, disabled }: ProposalFormContainerProps) => {
  return (
    <>
      <Content>
        <VStack gap={32}>{children}</VStack>
      </Content>
      <CreateProposalFooter loading={loading} onSubmit={onSubmit} disabled={disabled} />
    </>
  );
};
