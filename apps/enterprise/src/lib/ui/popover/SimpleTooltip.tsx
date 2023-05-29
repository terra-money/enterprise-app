import { ReactNode } from 'react';
import { Text } from 'lib/ui/Text';

import { PopoverHolder } from './PopoverHolder';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  text?: ReactNode;
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  padding: 20px 16px;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-weight: 500;
  border-radius: 12px;
`;

export const SimpleTooltip = ({ children, text }: Props) => {
  if (!text) return <>{children}</>;
  return (
    <PopoverHolder
      renderContainer={(props) => <div {...props}>{children}</div>}
      tooltip={
        <Container>
          <Text as="div">{text}</Text>
        </Container>
      }
    />
  );
};
