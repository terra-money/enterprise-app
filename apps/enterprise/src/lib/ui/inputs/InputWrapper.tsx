import styled, { css } from 'styled-components';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

import { ReactNode } from 'react';

export interface InputWrapperProps {
  label?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
  as?: string | React.ComponentType<any>;
}

const Container = styled(VStack)<{ isValid: boolean }>`
  color: ${({ isValid, theme }) => (isValid ? theme.colors.textSupporting : theme.colors.alert).toCssValue()};

  ${({ isValid, theme }) =>
    isValid &&
    css`
      :focus-within {
        color: ${theme.colors.text.toCssValue()};
      }
    `}
`;

export const InputWrapper = ({ label, children, error, as = 'label' }: InputWrapperProps) => (
  <Container tabIndex="-1" isValid={!error} fullWidth gap={8} as={as}>
    {label && <Text as="div">{label}</Text>}
    {children}
  </Container>
);

export interface InputWrapperWithErrorMessageProps extends InputWrapperProps {
  inputOverlay?: React.ReactNode;
  message?: ReactNode;
}

export const InputWrapperWithErrorMessage = ({
  children,
  inputOverlay,
  ...props
}: InputWrapperWithErrorMessageProps) => (
  <InputWrapper {...props}>
    <VStack style={{ position: 'relative' }} fullWidth gap={4}>
      <VStack fullWidth justifyContent="center" style={{ position: 'relative' }}>
        {children}
        {inputOverlay}
      </VStack>
      <Message color={props.error ? 'alert' : 'supporting'}>{props.error || props.message}</Message>
    </VStack>
  </InputWrapper>
);

const Message = styled(Text)`
  --height: 0.86em;
  line-height: var(--height);
  font-size: var(--height);
  min-height: var(--height);
`;
