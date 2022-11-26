import classNames from 'classnames';
import { IconButton, IconButtonProps } from '../primitives/icon-button/IconButton';
import styles from './DeleteIconButton.module.sass';
import { ReactComponent as TrashBinIcon } from 'components/assets/TrashBin.svg';

export const DeleteIconButton = ({ className, ...rest }: IconButtonProps) => {
  return (
    <IconButton className={classNames(className, styles.delete)} {...rest}>
      <TrashBinIcon />
    </IconButton>
  );
};
