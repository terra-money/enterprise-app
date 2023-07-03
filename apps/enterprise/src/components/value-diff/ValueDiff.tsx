import { ReactComponent as ArrowRightIcon } from 'components/assets/ArrowRight.svg';
import { ReactNode } from 'react';
import { Text } from 'lib/ui/Text';
import styled from 'styled-components';
import { HStack } from 'lib/ui/Stack';

interface ValueDiffProps {
  oldValue: ReactNode;
  newValue: ReactNode;
}

const OldValue = styled(Text)`
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  text-decoration-line: line-through;
`;

export const ValueDiff = ({ oldValue, newValue }: ValueDiffProps) => (
  <HStack alignItems="center" gap={12}>
    <OldValue size={14} weight="semibold" as="div">
      {oldValue}
    </OldValue>
    <ArrowRightIcon />
    <Text size={14} weight="semibold" as="div">
      {newValue}
    </Text>
  </HStack>
);
