import styles from './SliceHeader.module.sass';
import { Text } from 'components/primitives';

interface SliceHeaderProps {
  title: string;
  description: string;
}

export const SliceHeader = ({ title, description }: SliceHeaderProps) => (
  <div className={styles.root}>
    <Text variant="heading2">{title}</Text>
    <Text className={styles.description} variant="heading4" component="span">
      {description}
    </Text>
  </div>
);
