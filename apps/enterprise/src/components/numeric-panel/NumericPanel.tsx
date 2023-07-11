import { Formatter } from '@terra-money/apps/components';
import Big, { BigSource } from 'big.js';
import { ReactNode } from 'react';
import { Spinner } from 'lib/ui/Spinner';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Panel } from 'lib/ui/Panel/Panel';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

interface NumericPanelProps {
  title: string;
  value?: BigSource;
  formatter?: Formatter<BigSource>;
  decimals?: number;
  footnote?: ReactNode;
  suffix?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const FriendlyFormatter = (amount: BigSource, decimals: number): string => {
  if (Big(amount).gte(1000000000)) {
    return `${formatAmount(Big(amount).div(1000000000).toNumber(), { decimals: 2 })}B`;
  }
  if (Big(amount).gte(1000000)) {
    return `${formatAmount(Big(amount).div(1000000).toNumber(), { decimals: 2 })}M`;
  }
  return formatAmount(Big(amount).toNumber(), { decimals });
};

export const NumericPanel = (props: NumericPanelProps) => {
  const {
    title,
    value,
    suffix,
    formatter = (v) => FriendlyFormatter(v, decimals),
    decimals = 0,
    footnote,
    isLoading = false,
  } = props;

  return (
    <Panel>
      <VStack gap={8}>
        <Text>{title}</Text>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {value !== undefined && (
              <Text size={20} weight="bold">
                {formatter(value)}{' '}
                {suffix && (
                  <Text as="span" color="shy">
                    {suffix}
                  </Text>
                )}
              </Text>
            )}
            {footnote && <Text>{footnote}</Text>}
          </>
        )}
      </VStack>
    </Panel>
  );
};
