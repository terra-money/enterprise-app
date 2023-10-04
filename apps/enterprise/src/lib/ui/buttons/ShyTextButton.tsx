import { ReactNode } from 'react';
import styled from 'styled-components';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import { Text } from 'lib/ui/Text';

import { UnstyledButton } from './UnstyledButton';

interface Props {
  onClick?: () => void;
  text: ReactNode;
  as?: any;
}

const Container = styled(UnstyledButton)`
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  border-bottom: 1px dashed;

  ${defaultTransitionCSS};

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`;

export const ShyTextButton = ({ onClick, text, as }: Props) => {
  return (
    <Container forwardedAs={as} onClick={onClick}>
      <Text as="span" style={{ transition: 'none' }} weight="bold" size={14}>
        {text}
      </Text>
    </Container>
  );
};
