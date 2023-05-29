import { useCallback } from 'react';
import { useClipboardCopy } from './useClipboardCopy';
import { useMyAddress } from 'chain/hooks/useMyAddress';

type CopyField = 'address';

const copyFieldToText: Record<CopyField, string> = {
  address: 'Address copied to clipboard!',
};

export const useCopy = (field: CopyField) => {
  const myAddress = useMyAddress();

  const clipboardCopy = useClipboardCopy();

  return useCallback(() => {
    if (myAddress) {
      clipboardCopy({
        value: myAddress,
        message: copyFieldToText[field],
      });
    }
  }, [clipboardCopy, myAddress, field]);
};
