import { ClickAwayListener } from '@mui/material';
import { useConnectedWallet, useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { UIElementProps } from '@terra-money/apps/components';
import { useState } from 'react';
import { ButtonProps, IconButton, Throbber } from 'components/primitives';
import { ReactComponent as WalletIcon } from 'components/assets/Wallet.svg';
import classNames from 'classnames';
import { useConnectWalletDialog } from 'components/dialog/connect-wallet';
import { ConnectedWalletDialog } from './ConnectedWalletDialog';
import styles from './WalletConnectionButton.module.sass';

interface IndicatorProps {
  connected: boolean;
}

const Indicator = (props: IndicatorProps) => {
  const { connected } = props;
  return (
    <div
      className={classNames(styles.indicator, {
        [styles.connected]: connected,
      })}
    />
  );
};

interface NotConnectedButtonProps extends Pick<ButtonProps, 'onClick'> {}

const NotConnectedButton = (props: NotConnectedButtonProps) => {
  const { status } = useWallet();

  const { onClick } = props;

  return (
    <IconButton className={styles.button} disabled={status === WalletStatus.INITIALIZING} onClick={onClick}>
      {status === WalletStatus.INITIALIZING ? (
        <Throbber dotClassName={styles.throbberDot} variant="secondary" size="small" />
      ) : (
        <WalletIcon />
      )}
      <Indicator connected={false} />
    </IconButton>
  );
};

interface ConnectedButtonProps {
  //address: string;
  onClick: () => void;
  //onMenuClick: () => void;
}

const ConnectedButton = (props: ConnectedButtonProps) => {
  const { onClick } = props;

  return (
    <IconButton className={classNames(styles.button, styles.connected)} onClick={onClick}>
      <WalletIcon />
      <Indicator connected={true} />
    </IconButton>
  );
};

export const WalletConnectionButton = (props: UIElementProps) => {
  const { className } = props;

  const connectedWallet = useConnectedWallet();

  const [open, setOpen] = useState(false);

  const openConnectWalletDialog = useConnectWalletDialog();

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={classNames(styles.root, className)}>
        {connectedWallet === undefined || connectedWallet.walletAddress === undefined ? (
          <NotConnectedButton onClick={openConnectWalletDialog} />
        ) : (
          <>
            <ConnectedButton onClick={() => setOpen((open) => !open)} />
            {open && <ConnectedWalletDialog onClose={() => setOpen(false)} />}
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};
