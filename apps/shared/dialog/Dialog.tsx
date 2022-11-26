import { Modal } from "@mui/material";
import classNames from "classnames";
import { ReactNode } from "react";
import { useDialogContext } from "./DialogProvider";
import styles from "./Dialog.module.sass";

interface DialogProps {
  index: number;
  closeDialog: (returnValue: any) => void;
  children: ReactNode;
}

export const Dialog = (props: DialogProps) => {
  const { index, closeDialog, children } = props;

  const { dialogs } = useDialogContext();

  return (
    <Modal className={styles.root} open={true} hideBackdrop={index > 0} onClose={() => closeDialog(undefined)}>
      <div
        className={classNames(styles.content, {
          [styles.hide]: index < dialogs.length - 1,
        })}
      >
        {children}
      </div>
    </Modal>
  );
};
