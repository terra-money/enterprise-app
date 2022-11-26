import { DialogProps, useDialog } from '@terra-money/apps/hooks';
import { DialogHeader, DialogBody, DialogFooter, Dialog } from 'components/dialog';
import { Button, Text } from 'components/primitives';
import styles from './BetaWarningDialog.module.sass';

const BetaWarningDialog = (props: DialogProps) => {
  const { closeDialog } = props;

  return (
    <Dialog>
      <DialogHeader title="Before you proceed" onClose={() => closeDialog(undefined, { closeAll: true })} />
      <DialogBody className={styles.body}>
        <Text variant="text">
          This is the beta release of the Enterprise app. Although Enterprise has been evaluated internally, it is still
          undergoing an external security audit.
        </Text>
      </DialogBody>
      <DialogFooter>
        <Button variant="primary" onClick={() => closeDialog(undefined, { closeAll: true })}>
          Proceed
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export const useBetaWarningDialog = () => {
  return useDialog(BetaWarningDialog);
};
