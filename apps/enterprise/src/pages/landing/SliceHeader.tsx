import styles from './SliceHeader.module.sass';
import { Text } from 'lib/ui/Text';

interface SliceHeaderProps {
  title: string;
  description: string;
}

export const SliceHeader = ({ title, description }: SliceHeaderProps) => (
  <div className={styles.root}>
    <Text size={32} weight="bold">
      {title}
    </Text>
    <Text className={styles.description} weight="semibold" as="span">
      {description}
    </Text>
  </div>
);
