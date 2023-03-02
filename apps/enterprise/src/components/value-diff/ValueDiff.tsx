import { Text } from 'components/primitives';
import styles from './ValueDiff.module.sass';
import { ReactComponent as ArrowRightIcon } from 'components/assets/ArrowRight.svg';
import { ReactNode } from 'react';

interface ValueDiffProps {
  oldValue: ReactNode;
  newValue: ReactNode;
}

export const ValueDiff = ({ oldValue, newValue }: ValueDiffProps) => (
  <div className={styles.root}>
    <Text className={styles.oldValue} variant="text">
      {oldValue}
    </Text>
    <ArrowRightIcon />
    <Text className={styles.newValue} variant="text">
      {newValue}
    </Text>
  </div>
);
