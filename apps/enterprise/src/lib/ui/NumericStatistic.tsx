import { ReactNode } from 'react';
import { HStack } from './Stack';
import { Text } from './Text';

interface NumericStatisticProps {
  value: ReactNode;
  suffix?: ReactNode;
}

export const NumericStatistic = ({ value, suffix }: NumericStatisticProps) => {
  return (
    <HStack gap={8} alignItems="center">
      <Text weight="bold" size={20}>
        {value}
      </Text>
      {suffix && (
        <Text weight="bold" color="shy" size={20}>
          {suffix}
        </Text>
      )}
    </HStack>
  );
};
