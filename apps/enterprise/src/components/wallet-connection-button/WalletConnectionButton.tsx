import { ClickAwayListener } from '@mui/material';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { UIElementProps } from '@terra-money/apps/components';
import { useState } from 'react';
import { useConnectWalletDialog } from 'components/dialog/connect-wallet';
import { ConnectedWalletDialog } from './ConnectedWalletDialog';
import { WalletButton } from 'chain/components/WalletButton';

export const WalletConnectionButton = (props: UIElementProps) => {
  const { className } = props;

  const connectedWallet = useConnectedWallet();

  const [open, setOpen] = useState(false);

  const openConnectWalletDialog = useConnectWalletDialog();

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={className}>
        {connectedWallet === undefined || connectedWallet.walletAddress === undefined ? (
          <WalletButton onClick={() => openConnectWalletDialog({})} />
        ) : (
          <>
            <WalletButton onClick={() => setOpen((open) => !open)} />
            {open && <ConnectedWalletDialog onClose={() => setOpen(false)} />}
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};
