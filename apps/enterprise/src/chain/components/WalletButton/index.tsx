// TODO: migrate from sass to styled-components
import { useConnectedWallet, useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { IconButton, Throbber } from 'components/primitives';
import { ReactComponent as WalletIcon } from 'components/assets/Wallet.svg';
import classNames from 'classnames';
import styles from './WalletButton.module.sass';

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

interface WalletButtonProps {
  onClick: () => void;
}

export const WalletButton = ({ onClick }: WalletButtonProps) => {
  const { status } = useWallet();

  const connectedWallet = useConnectedWallet();

  const isInitializing = status === WalletStatus.INITIALIZING;

  return (
    <IconButton className={styles.button} disabled={isInitializing} onClick={onClick}>
      {isInitializing ? (
        <Throbber dotClassName={styles.throbberDot} variant="secondary" size="small" />
      ) : (
        <WalletIcon />
      )}
      <Indicator connected={!!connectedWallet} />
    </IconButton>
  );
};
