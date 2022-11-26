import { Text } from 'components/primitives';
import { Container } from '@terra-money/apps/components/container';
import { ReactComponent as CloseIcon } from 'components/assets/Close.svg';
import classNames from 'classnames';
import { UIElementProps } from '@terra-money/apps/components';
import { useDialogContext } from '@terra-money/apps/dialog';
import { forwardRef } from 'react';
import styles from './DialogHeader.module.sass';

interface DialogHeaderProps extends UIElementProps {
  title: string;
  onClose: () => void;
}

export const DialogHeader = forwardRef<any, DialogHeaderProps>((props, ref) => {
  const { className, title, children, onClose } = props;

  const { dialogs, popDialog } = useDialogContext();

  return (
    <Container ref={ref} className={classNames(className, styles.root)} direction="column">
      {dialogs.length > 1 && (
        <Text className={styles.back} variant="link" onClick={popDialog}>
          Back
        </Text>
      )}
      <CloseIcon className={styles.close} onClick={onClose} />
      <Text className={styles.title} variant="heading3">
        {title}
      </Text>
      {children && <div className={styles.children}>{children}</div>}
    </Container>
  );
});
