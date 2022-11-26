import { ButtonProps, Text } from 'components/primitives';
import classNames from 'classnames';
import styles from './OptionButton.module.sass';

interface OptionButtonProps extends Pick<ButtonProps, 'onClick'> {
  title: string;
  active: boolean;
}

export const OptionButton = (props: OptionButtonProps) => {
  const { title, active, ...rest } = props;
  return (
    <button className={classNames(styles.root, { [styles.active]: active })} {...rest}>
      <Text variant="button">{title}</Text>
    </button>
  );
};
