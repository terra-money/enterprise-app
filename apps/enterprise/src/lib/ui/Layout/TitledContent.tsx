import { ComponentWithChildrenProps } from 'lib/shared/props';
import { ReactNode } from 'react';
import { VStack } from '../Stack';
import { Text } from '../Text';

interface Props extends ComponentWithChildrenProps {
  title: ReactNode;
}

export const TitledContent = ({ title, children }: Props) => (
  <VStack gap={16}>
    <Text as="div" size={16} color="supporting">
      {title}
    </Text>
    {children}
  </VStack>
);
