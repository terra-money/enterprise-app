import { ComponentWithChildrenProps } from 'lib/shared/props';
import { ReactNode } from 'react';
import { VStack } from '../Stack';
import { Text } from '../Text';

interface Props extends ComponentWithChildrenProps {
  title: ReactNode;
}

export const TitledSection = ({ title, children }: Props) => (
  <VStack gap={16}>
    <Text as="div" weight="semibold">
      {title}
    </Text>
    {children}
  </VStack>
);
