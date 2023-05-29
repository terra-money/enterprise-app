import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import { HSLA } from 'lib/ui/colors/HSLA';
import { Text } from 'lib/ui/Text';

type Props = ComponentProps<typeof Text> & {
  color: HSLA;
  children: ReactNode;
};

const Container = styled(Text)<{ $color: HSLA }>`
  padding: 4px 8px;
  border-radius: 8px;
  color: ${({ $color }) => $color.toCssValue()};
  background: ${({ $color }) => $color.getVariant({ a: () => 0.14 }).toCssValue()};
`;

export const Tag = ({ color, children, ...rest }: Props) => {
  return (
    <Container as="span" $color={color} {...rest}>
      {children}
    </Container>
  );
};
