import { Container, UIElementProps } from '@terra-money/apps/components';
import Big from 'big.js';
import classNames from 'classnames';
import { AnimateNumber } from 'components/animate-number/AnimateNumber';
import { Text } from 'components/primitives/text';
import { ReactNode } from 'react';

import styles from './Metric.module.sass';
import { formatAmount } from 'lib/shared/utils/formatAmount';

type MetricProps = UIElementProps & {
  label: string;
  amount: Big;
  icon?: ReactNode;
  suffix?: string;
  prefix?: string;
  smallAmountDisplay?: string;
  isSmallAmount?: boolean;
  footer?: ReactNode;
  decimals?: number;
};

export const Metric = (props: MetricProps) => {
  const {
    className,
    icon,
    amount,
    label,
    suffix,
    prefix,
    isSmallAmount,
    smallAmountDisplay,
    footer,
    decimals = 2,
  } = props;

  return (
    <Container className={classNames(styles.root, className)}>
      <Container className={styles.left} direction="column">
        <Text variant="label" className={styles.label}>
          {label}
        </Text>
        <Text variant="heading1" className={styles.amount}>
          {prefix}
          <AnimateNumber
            format={(v) =>
              isSmallAmount && smallAmountDisplay
                ? smallAmountDisplay
                : formatAmount(v.toNumber(), {
                    decimals,
                  })
            }
          >
            {amount}
          </AnimateNumber>
          {suffix}
        </Text>
        {footer}
      </Container>
      <Container className={styles.right}>{icon}</Container>
    </Container>
  );
};
