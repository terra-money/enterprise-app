import classNames from 'classnames';
import { Text } from 'components/primitives';
import styles from './Tag.module.sass';

interface TagProps {
  className?: string;
  children: string;
}

export const Tag = (props: TagProps) => {
  const { className, children } = props;
  return (
    <Text className={classNames(className, styles.root)} variant="text">
      {children}
    </Text>
  );
};
