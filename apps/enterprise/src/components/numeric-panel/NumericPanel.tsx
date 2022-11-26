import { AnimateNumber, Container, Formatter } from '@terra-money/apps/components';
import { Text, Throbber } from 'components/primitives';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { Panel, PanelProps } from 'components/panel';
import Big, { BigSource } from 'big.js';
import { ReactNode } from 'react';
import styles from './NumericPanel.module.sass';

interface NumericPanelProps extends PanelProps {
  title?: string;
  value?: BigSource;
  formatter?: Formatter<BigSource>;
  decimals?: number;
  footnote?: ReactNode;
  suffix?: ReactNode;
  isLoading?: boolean;
}

export const FriendlyFormatter = (amount: BigSource, decimals: number): string => {
  if (Big(amount).gte(1000000000)) {
    return `${formatAmount(Big(amount).div(1000000000), { decimals: 2 })}B`;
  }
  if (Big(amount).gte(1000000)) {
    return `${formatAmount(Big(amount).div(1000000), { decimals: 2 })}M`;
  }
  return formatAmount(amount, { decimals });
};

export const NumericPanel = (props: NumericPanelProps) => {
  const {
    className,
    title,
    value,
    suffix,
    formatter = (v) => FriendlyFormatter(v, decimals),
    decimals = 0,
    footnote,
    isLoading = false,
  } = props;

  return (
    <Panel className={className} title={title}>
      {isLoading ? (
        <Container className={styles.content}>
          <Throbber className={styles.throbber} variant="secondary" size="small" />
        </Container>
      ) : (
        <>
          <Container className={styles.content}>
            {value !== undefined && (
              <Text variant="heading3">
                <AnimateNumber format={formatter}>{value}</AnimateNumber>
                {suffix && <sub>{suffix}</sub>}
              </Text>
            )}
          </Container>
          {footnote && <Text variant="label">{footnote}</Text>}
        </>
      )}
    </Panel>
  );
};
