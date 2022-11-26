import { UIElementProps } from '@terra-money/apps/components';
import { Text } from 'components/primitives/text';
import styles from './CopySnackbar.module.sass';
import { ReactComponent as CheckIcon } from 'components/assets/Check.svg';

type CopySnackbarProps = UIElementProps & {
  text: string;
};

export const CopySnackbar = (props: CopySnackbarProps) => {
  const { text } = props;

  return (
    <div className={styles.root}>
      <CheckIcon className={styles.icon} />

      <Text className={styles.text} variant="label">
        {text}
      </Text>
    </div>
  );
};
