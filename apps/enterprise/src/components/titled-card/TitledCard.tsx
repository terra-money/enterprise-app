import { Text } from 'components/primitives';
import styles from './TitledCard.module.sass';
import { ComponentWithChildrenProps } from 'lib/shared/props';

interface Props extends ComponentWithChildrenProps {
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
