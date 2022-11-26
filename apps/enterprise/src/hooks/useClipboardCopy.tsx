import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useCopyToClipboard } from 'react-use';
import { CopySnackbar } from 'components/snackbar/copy/CopySnackbar';

type ClipboardCopyOptions = { value: string; message: string };

type ClipboardCopyReturn = (options: ClipboardCopyOptions) => void;

export const useClipboardCopy = (): ClipboardCopyReturn => {
  const [, copyToClipboard] = useCopyToClipboard();

  const { enqueueSnackbar } = useSnackbar();

  return useCallback<ClipboardCopyReturn>(
    (options: ClipboardCopyOptions) => {
      const { value, message } = options;

      copyToClipboard(value);

      enqueueSnackbar(<CopySnackbar text={message} />, {
        preventDuplicate: true,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 2000,
      });
    },
    [copyToClipboard, enqueueSnackbar]
  );
};
