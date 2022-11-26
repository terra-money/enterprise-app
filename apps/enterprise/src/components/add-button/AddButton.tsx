import { ReactComponent as PlusIcon } from 'components/assets/Plus.svg';
import { IconButton, IconButtonProps } from 'components/primitives/icon-button';
import styles from './AddButton.module.sass';

export const AddButton = (props: IconButtonProps) => (
  <IconButton className={styles.root} size="large" {...props}>
    <PlusIcon />
  </IconButton>
);
