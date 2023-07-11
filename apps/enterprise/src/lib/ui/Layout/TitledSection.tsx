import { ComponentWithChildrenProps } from 'lib/shared/props';
import { ReactNode } from 'react';
import { VStack } from '../Stack';
import { Text } from '../Text';

interface Props extends ComponentWithChildrenProps {
  title: ReactNode;
}

export const TitledSection = ({ title, children }: Props) => (
  <VStack gap={20}>
    <Text as="div" weight="semibold" color="contrast">
      {title}
    </Text>
    {children}
  </VStack>
);
