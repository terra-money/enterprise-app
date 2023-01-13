import { ReactNode } from 'react';
import styled from 'styled-components';
import { Panel } from '../Panel/Panel';
import { VStack } from '../Stack';
import { Text } from '../Text';

interface EmptyStatePlaceholderProps {
  message: string;
  action?: ReactNode;
}

const Container = styled(Panel)`
  width: 100%;
  padding: 132px 48px;
`;

export const EmptyStatePlaceholder = ({ message, action }: EmptyStatePlaceholderProps) => (
  <Container>
    <VStack gap={24} alignItems="center">
      <Text color="supporting">{message}</Text>
      {action}
    </VStack>
  </Container>
);
