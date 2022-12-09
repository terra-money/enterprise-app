import { ComponentWithChildrenProps } from 'lib/shared/props';
import { VStack } from './Stack';
import { Text } from './Text';

interface Props extends ComponentWithChildrenProps {
  name: string;
}

export const LabeledPageSection = ({ children, name }: Props) => {
  return (
    <VStack gap={16}>
      <Text size={18} weight="semibold">
        {name}
      </Text>
      {children}
    </VStack>
  );
};
