import { UIElementProps } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import styles from './TitledCard.module.sass';

interface Props extends UIElementProps {
  title: string;
}

export const TitledCard = ({ title, children }: Props) => {
  return (
    <div className={styles.root}>
      <Text variant="heading3" className={styles.title}>
        {title}
      </Text>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
