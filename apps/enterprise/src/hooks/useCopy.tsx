import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCallback } from 'react';
import { useClipboardCopy } from './useClipboardCopy';

type CopyField = 'address';

const copyFieldToText: Record<CopyField, string> = {
  address: 'Address copied to clipboard!',
};

export const useCopy = (field: CopyField) => {
  const connectedWallet = useConnectedWallet();

  const clipboardCopy = useClipboardCopy();

  return useCallback(() => {
    if (connectedWallet) {
      clipboardCopy({
        value: connectedWallet.walletAddress,
        message: copyFieldToText[field],
      });
    }
  }, [clipboardCopy, connectedWallet, field]);
};
